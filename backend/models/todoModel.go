package models

import (
	"time"

	"gorm.io/gorm"
)

type Todo struct {
	ID        uint           `json:"id"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `json:"deletedAt,omitempty"`
	Content   string         `json:"content" validate:"required,min=3"`
	Completed bool           `json:"completed"`
	Email     string         `json:"email" validate:"required,email"`
}

func (todo *Todo) Validate() error {
	return validate.Struct(todo)
}
