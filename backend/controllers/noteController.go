package controllers

import (
	"fmt"
	"fn/initialiser"
	"fn/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func getNote(ID uint) (models.Note, error) {
	var note models.Note
	err := initialiser.DB.First(&note).Where("ID=?", ID)

	if err != nil {
		fmt.Println("Something went wrong!")
		return models.Note{}, nil
	}

	return note, nil

}

func AddNote(c *gin.Context) {
	var body struct {
		Title   string
		Content string
	}

	userCookie, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Unauthorized access",
			"success": false,
		})
		return
	}

	err := c.Bind(&body)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Wrong body sent",
			"success": false,
		})
		return
	}

	user := userCookie.(models.User)

	note := models.Note{
		Title:   body.Title,
		Content: body.Content,
		Email:   user.Email,
	}

	result := initialiser.DB.Create(&note)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Something went wrong!",
			"success": false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"Message": "Successfully added!",
		"success": true,
	})

}

func GetNotes(c *gin.Context) {
	userCookie, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Unauthorized access",
			"success": false,
		})
		return
	}

	user, ok := userCookie.(models.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to retrieve user details",
			"success": false,
		})
		return
	}
	var notes []models.Note

	if err := initialiser.DB.Where("email = ?", user.Email).Find(&notes).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to retrieve notes!",
			"success": false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Notes retrieved successfully!",
		"success": true,
		"notes":   notes,
	})
}

func GetNote(c *gin.Context) {
	ID := c.Query("id")

	var note models.Note

	result := initialiser.DB.Where("ID=?", ID).Find(&note)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to retrieve note details",
			"success": false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"Message": "Successfull",
		"note":    note,
		"success": true,
	})
}

func UpdateNote(c *gin.Context) {
	var updateBody struct {
		Title   string
		Content string
		ID      uint
	}

	err := c.Bind(&updateBody)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Wrong body sent",
			"success": false,
		})
		return
	}

	note, err := getNote(updateBody.ID)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Note not found",
			"success": false,
		})
		return
	}

	if updateBody.Content == "" {
		updateBody.Content = note.Content
	}

	if updateBody.Title == "" {
		updateBody.Title = note.Title
	}

	result := initialiser.DB.Model(&models.Note{}).Where("id = ?", updateBody.ID).
		Updates(models.Note{Title: updateBody.Title, Content: updateBody.Content})

	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Soemthing went wrong!",
			"success": false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"Message": "Note Updated!",
		"success": true,
	})
}

func DeleteNote(c *gin.Context) {
	var body struct {
		ID uint
	}

	err := c.Bind(&body)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Wrong body sent",
			"success": false,
		})
		return
	}

	result := initialiser.DB.Delete(&models.Note{}, body.ID)

	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Soemthing went wrong!",
			"success": false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"Message": "Note Deleted!",
		"success": true,
	})
}
