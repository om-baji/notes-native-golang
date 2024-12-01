package models

import "gorm.io/gorm"

type Todo struct {
	gorm.Model
	Content   string
	Completed bool
	Email     string
}
