package models

import "golang.org/x/crypto/bcrypt"

type User struct {
	Id           uint
	FirstName    string
	LastName     string
	Email        string
	Password     []byte
	IsAmbassador bool
}

func (user *User) SetPassword(password string) {
	hashed, _ := bcrypt.GenerateFromPassword([]byte(password), 12)
	user.Password = hashed
}

func (user *User) ComparePassword(password string) error {
	return bcrypt.CompareHashAndPassword(user.Password, []byte(password))
}
