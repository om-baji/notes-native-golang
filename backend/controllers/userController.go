package controllers

import (
	"fmt"
	"fn/initialiser"
	"fn/models"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

func Health(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"Message": "Health Ok!",
	})
}

func Signup(c *gin.Context) {
	var body struct {
		Name     string
		Email    string
		Password string
	}

	err := c.Bind(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Failed to read body",
		})

		return
	}

	tempUser := models.User{
		Name:     body.Name,
		Email:    body.Email,
		Password: body.Password,
	}

	if err := tempUser.Validate(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": fmt.Sprintf("Validation failed: %s", err),
			"success": false,
		})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Failed to hash the password",
		})

		return
	}

	user := models.User{
		Name:     body.Name,
		Email:    body.Email,
		Password: string(hash),
	}

	result := initialiser.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Signup failed!",
		})

		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	secret := []byte(os.Getenv("JWT_SECRET"))

	tokenString, err := token.SignedString(secret)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Login failed!",
			"token":   tokenString,
		})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "/", "notes-native-golang.onrender.com", true, true)

	c.JSON(http.StatusOK, gin.H{
		"Message":  "Signup succesfull",
		"response": result.RowsAffected,
	})
}

func Login(c *gin.Context) {
	var body struct {
		Email    string
		Password string
	}

	err := c.Bind(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Failed to read body",
		})

		return
	}

	var user models.User

	initialiser.DB.First(&user, "email=?", body.Email)

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Email not found!",
		})

		return
	}

	isValid := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))

	if isValid != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Password incorrect!",
		})
		return

	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	secret := []byte(os.Getenv("JWT_SECRET"))

	tokenString, err := token.SignedString(secret)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Message": "Login failed!",
			"token":   tokenString,
		})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "/", "notes-native-golang.onrender.com", true, true)

	c.JSON(http.StatusOK, gin.H{
		"Message": "Login successfull!",
	})

}

func Validate(c *gin.Context) {
	user, _ := c.Get("user")
	c.JSON(http.StatusOK, gin.H{
		"Message": "Logged in",
		"Value":   user,
	})
}
