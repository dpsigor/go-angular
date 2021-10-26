package controllers

import (
	"ambassador/src/database"
	"ambassador/src/models"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

type registerDTO struct {
	FirstName       string `json:"first_name"`
	LastName        string `json:"last_name"`
	Email           string `json:"email"`
	Password        string `json:"password"`
	PasswordConfirm string `json:"password_confirm"`
}

func Register(c *fiber.Ctx) error {
	var data registerDTO

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	if data.Password == "" || data.Email == "" {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "missing fields",
		})
	}

	if data.Password != data.PasswordConfirm {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "passwords do not match",
		})
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data.Password), 12)

	user := models.User{
		FirstName:    data.FirstName,
		LastName:     data.LastName,
		Email:        data.Email,
		Password:     password,
		IsAmbassador: false,
	}

	database.DB.Create(&user)

	return c.JSON(user)
}

type loginDTO struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Login(c *fiber.Ctx) error {
	var data loginDTO

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user models.User

	database.DB.Where("email = ?", data.Email).First(&user)

	if user.Id == 0 {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid credentials",
		})
	}

	err := bcrypt.CompareHashAndPassword(user.Password, []byte(data.Password))
	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Invalid credentials",
		})
	}

	return c.JSON(user)
}
