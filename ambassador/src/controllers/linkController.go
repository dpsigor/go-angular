package controllers

import (
	"ambassador/src/database"
	"ambassador/src/middlewares"
	"ambassador/src/models"
	"strconv"

	"github.com/bxcodec/faker/v3"
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

type CreateLinkRequest struct {
	Products []int
}

func CreateLink(c *fiber.Ctx) error {
	var request CreateLinkRequest

	if err := c.BodyParser(&request); err != nil {
		return err
	}

	id, _ := middlewares.GetUserId(c)

	link := models.Link{
		UserId: id,
		Code:   faker.Username(),
	}

	for _, productId := range request.Products {
		product := models.Product{}
		product.Id = uint(productId)
		link.Products = append(link.Products, product)
	}

	database.DB.Create(&link)

	return c.JSON(link) // Não devolve corretamente todos os dados do user ou dos products: é preciso preload os links
}

func Stats(c *fiber.Ctx) error {
	id, _ := middlewares.GetUserId(c)

	var links []models.Link

	database.DB.Find(&links, models.Link{
		UserId: id,
	})

	var result []interface{}

	var orders []models.Order

	for _, link := range links {
		database.DB.Preload("OrderItems").Find(&orders, &models.Order{
			Code:     link.Code,
			Complete: true,
		})

		var revenue float64 = 0
		for _, order := range orders {
			revenue += order.GetTotal()
		}

		result = append(result, fiber.Map{
			"code":    link.Code,
			"count":   len(orders),
			"revenue": revenue,
		})
	}

	return c.JSON(result)
}
