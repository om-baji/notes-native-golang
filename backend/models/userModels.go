package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name     string `validate:"required,min=2"`
	Email    string `gorm:"unique"`
	Password string `validate:"required,min=6"`
}

func (user *User) Validate() error {
	return validate.Struct(user)
}
