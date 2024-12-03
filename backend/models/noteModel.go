package models

import (
	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

type Note struct {
	gorm.Model
	Title   string `validate:"required,min=3"`
	Content string `validate:"required,min=6"`
	Email   string `validate:"required,email"`
}

var validate = validator.New()

func (note *Note) Validate() error {
	return validate.Struct(note)
}
