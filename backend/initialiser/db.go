package initialiser

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDb() {

	var err error

	uri := os.Getenv("POSTGRES_URI")

	dsn := uri
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Database connection failed!")
	}

	fmt.Println("Database connected!")

}
