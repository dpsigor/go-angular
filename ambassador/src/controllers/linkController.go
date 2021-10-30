package controllers

import (
	"ambassador/src/database"
	"ambassador/src/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func Link(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "failed to parse id",
		})
	}

	var links []models.Link

	database.DB.Where("user_id = ?", id).Find(&links)

	for k, link := range links {
		var orders []models.Order
		database.DB.Where("code = ? and complete = true", link.Code).Find(&orders)
		links[k].Orders = orders
	}

	return c.JSON(links)
}
