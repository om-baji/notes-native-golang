package initialiser

import (
	"log"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	err := godotenv.Load(".env.local")

	if err != nil {
		log.Fatal("Error while loading env")
	}
}
