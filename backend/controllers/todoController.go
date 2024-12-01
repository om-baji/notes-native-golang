package controllers

import (
	"fn/initialiser"
	"fn/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AddTodo(c *gin.Context) {

	var body struct {
		Content string
	}

	err := c.Bind(&body)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Wrong body",
			"success": false,
		})
		return
	}

	var user models.User

	userCookie, _ := c.Get("user")
	user = userCookie.(models.User)

	var todo = models.Todo{
		Content:   body.Content,
		Completed: false,
		Email:     user.Email,
	}

	result := initialiser.DB.Create(&todo)

	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Something went wrong!",
			"success": false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"Message": "Todo added",
		"success": true,
	})

}

func GetTodos(c *gin.Context) {
	userCookie, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Unauthorized access",
			"success": false,
		})
		return
	}

	var user models.User

	user, ok := userCookie.(models.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to retrieve user details",
			"success": false,
		})
		return
	}

	var todos []models.Todo

	result := initialiser.DB.Where("email=?", user.Email).Find(&todos)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to retrieve todo details",
			"success": false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"Message": "Retreived Todos",
		"todos":   todos,
		"success": true,
	})
}

func GetTodo(c *gin.Context) {

	ID := c.Query("id")

	var todo models.Todo

	result := initialiser.DB.Where("ID=?", ID).Find(&todo)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to retrieve todo details",
			"success": false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"Message": "Successfull",
		"todo":    todo,
		"success": true,
	})

}

func UpdateTodo(c *gin.Context) {
	var body struct {
		ID      string
		Content string
	}

	body.ID = c.Query("id")

	err := c.Bind(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Wrong body",
			"success": false,
		})
		return
	}

	result := initialiser.DB.
		Model(&models.Todo{}).
		Where("ID=?", body.ID).
		Updates(models.Todo{Content: body.Content, Completed: false})

	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Soemthing went wrong!",
			"success": false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"Message": "Todo Updated!",
		"success": true,
	})

}

func ToggleTodo(c *gin.Context) {
	var body struct {
		ID string
	}

	err := c.Bind(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Wrong body",
			"success": false,
		})
		return
	}

	var todo models.Todo

	found := initialiser.DB.Where("ID=?", body.ID).Find(&todo)

	if found.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Todo not found!",
			"success": false,
		})
		return
	}

	result := initialiser.DB.
		Model(&models.Todo{}).
		Where("ID=?", body.ID).
		Updates(models.Todo{Completed: !todo.Completed})

	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Soemthing went wrong!",
			"success": false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"Message": "Todo Updated!",
		"success": true,
	})
}

func DeleteTodo(c *gin.Context) {
	var body struct {
		ID string
	}

	err := c.Bind(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Wrong body",
			"success": false,
		})
		return
	}

	result := initialiser.DB.Delete(&models.Todo{}, body.ID)

	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Soemthing went wrong!",
			"success": false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"Message": "Todo Deleted!",
		"success": true,
	})

}
