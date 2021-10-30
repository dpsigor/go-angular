package controllers

import (
	"ambassador/src/database"
	"ambassador/src/models"

	"github.com/gofiber/fiber/v2"
)

func Orders(c *fiber.Ctx) error {
	var orders []models.Order
	database.DB.Preload("OrderItems").Find(&orders)
	for k, order := range orders {
		orders[k].Name = order.FullName()
		orders[k].Total = order.GetTotal()
	}
	return c.JSON(orders)
}
