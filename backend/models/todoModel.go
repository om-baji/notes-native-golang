package models

import (
	"gorm.io/gorm"
)

type Todo struct {
	gorm.Model
	Content   string `validate:"required,min=3"`
	Completed bool
	Email     string `validate:"required,email"`
}

func (todo *Todo) Validate() error {
	return validate.Struct(todo)
}
