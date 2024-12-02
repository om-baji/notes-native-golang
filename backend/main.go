package main

import (
	"fn/controllers"
	"fn/initialiser"
	"fn/middleware"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initialiser.LoadEnv()
	initialiser.ConnectDb()
	initialiser.SyncDB()
}

func main() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.POST("/signup", controllers.Signup)
	router.POST("/signin", controllers.Login)
	router.GET("/validate", middleware.RequireAuth, controllers.Validate)

	router.GET("/notes", middleware.RequireAuth, controllers.GetNotes)
	router.GET("/note", middleware.RequireAuth, controllers.GetNote)
	router.PUT("/notes", middleware.RequireAuth, controllers.UpdateNote)
	router.POST("/notes", middleware.RequireAuth, controllers.AddNote)
	router.DELETE("/notes", middleware.RequireAuth, controllers.DeleteNote)

	router.GET("/todos", middleware.RequireAuth, controllers.GetTodos)
	router.GET("/todo", middleware.RequireAuth, controllers.GetTodo)
	router.PUT("/todo", middleware.RequireAuth, controllers.UpdateTodo)
	router.PUT("/todo/:id", middleware.RequireAuth, controllers.ToggleTodo)
	router.POST("/todos", middleware.RequireAuth, controllers.AddTodo)
	router.DELETE("/todo", middleware.RequireAuth, controllers.DeleteNote)

	router.Run()
}
