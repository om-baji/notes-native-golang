package main

import (
	"fn/controllers"
	"fn/initialiser"
	"fn/middleware"

	"github.com/gin-gonic/gin"
)

func init() {
	initialiser.LoadEnv()
	initialiser.ConnectDb()
	initialiser.SyncDB()
}

func main() {
	router := gin.Default()

	router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"msg": "HUh",
		})
	})

	router.POST("/signup", controllers.Signup)
	router.POST("/signin", controllers.Login)
	router.GET("/validate", middleware.RequireAuth, controllers.Validate)

	router.GET("/notes", middleware.RequireAuth, controllers.GetNotes)
	router.PUT("/notes", middleware.RequireAuth, controllers.UpdateNote)
	router.POST("/notes", middleware.RequireAuth, controllers.AddNote)
	router.DELETE("/notes", middleware.RequireAuth, controllers.DeleteNote)

	router.GET("/todos", middleware.RequireAuth, controllers.GetTodos)
	router.GET("/todo", middleware.RequireAuth, controllers.GetTodo)
	router.PUT("/todo", middleware.RequireAuth, controllers.UpdateTodo)
	router.PUT("/todo/{id}", middleware.RequireAuth, controllers.ToggleTodo)
	router.POST("/todos", middleware.RequireAuth, controllers.AddTodo)
	router.DELETE("/todo", middleware.RequireAuth, controllers.DeleteNote)

	router.Run()
}
