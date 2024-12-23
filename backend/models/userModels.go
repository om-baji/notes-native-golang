package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID        uint           `json:"id"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `json:"deletedAt,omitempty"`
	Name      string         `json:"name" validate:"required,min=2"`
	Email     string         `json:"email" gorm:"unique"`
	Password  string         `json:"password" validate:"required,min=6"`
}

func (user *User) Validate() error {
	return validate.Struct(user)
}
