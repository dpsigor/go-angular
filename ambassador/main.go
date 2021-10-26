package main

import (
	"ambassador/src/database"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
	database.Connect()
	database.AutoMigrate()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})

	app.Listen(":8000")
}
