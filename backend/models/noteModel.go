package models

import (
	"time"

	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

type Note struct {
	ID        uint           `json:"id"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `json:"deletedAt,omitempty"`
	Title     string         `json:"title" validate:"required,min=3"`
	Content   string         `json:"content" validate:"required,min=6"`
	Email     string         `json:"email" validate:"required,email"`
}

var validate = validator.New()

func (note *Note) Validate() error {
	return validate.Struct(note)
}
