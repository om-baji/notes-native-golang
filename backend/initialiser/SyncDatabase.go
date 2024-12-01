package initialiser

import "fn/models"

func SyncDB() {
	DB.AutoMigrate(&models.User{})
	DB.AutoMigrate(&models.Note{})
	DB.AutoMigrate(&models.Todo{})
}
