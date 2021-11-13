package controllers

import (
	"ambassador/src/database"
	"ambassador/src/models"
	"context"
	"encoding/json"
	"fmt"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
)

func Products(c *fiber.Ctx) error {
	var products []models.Product

	database.DB.Find(&products)

	return c.JSON(products)
}

func CreateProducts(c *fiber.Ctx) error {
	var product models.Product

	if err := c.BodyParser(&product); err != nil {
		return err
	}
	database.DB.Create(&product)
	go database.ClearCache("products_frontend", "products_backend")
	return c.JSON(product)
}

func GetProduct(c *fiber.Ctx) error {
	var product models.Product

	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "failed to parse id",
		})
	}

	product.Id = uint(id)

	r := database.DB.Find(&product)

	if r.RowsAffected == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "product not found",
		})
	}

	return c.JSON(product)
}

func UpdateProduct(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "failed to parse id",
		})
	}
	product := models.Product{}
	product.Id = uint(id)
	if err := c.BodyParser(&product); err != nil {
		return err
	}
	r := database.DB.Model(&product).Updates(&product)
	if r.RowsAffected == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "product not found or without changes",
		})
	}
	go database.ClearCache("products_frontend", "products_backend")
	return c.JSON(product)
}

func DeleteProduct(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "failed to parse id",
		})
	}
	product := models.Product{}
	product.Id = uint(id)
	r := database.DB.Delete(&product)
	go database.ClearCache("products_frontend", "products_backend")
	if r.RowsAffected == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "product not found",
		})
	}
	return nil
}

func ProductsFrontend(c *fiber.Ctx) error {
	var products []models.Product
	var ctx = context.Background()
	result, err := database.Cache.Get(ctx, "products_frontend").Result()
	if err != nil {
		database.DB.Find(&products)
		bytes, err := json.Marshal(products)
		if err != nil {
			panic(err)
		}
		if err = database.Cache.Set(ctx, "products_frontend", bytes, 30*time.Minute).Err(); err != nil {
			fmt.Println(err)
		}
	} else {
		err = json.Unmarshal([]byte(result), &products)
		if err != nil {
			panic(err)
		}
	}
	return c.JSON(products)
}

func ProductsBackend(c *fiber.Ctx) error {
	var products []models.Product
	var ctx = context.Background()
	result, err := database.Cache.Get(ctx, "products_backend").Result()
	if err != nil {
		database.DB.Find(&products)
		bytes, err := json.Marshal(products)
		if err != nil {
			panic(err)
		}
		database.Cache.Set(ctx, "products_backend", bytes, 30*time.Minute)
	} else {
		json.Unmarshal([]byte(result), &products)
	}
	var searchedProducts []models.Product
	if s := c.Query("s"); s != "" {
		lower := strings.ToLower(s)
		for _, product := range products {
			if strings.Contains(strings.ToLower(product.Title), lower) || strings.Contains(strings.ToLower(product.Description), lower) {
				searchedProducts = append(searchedProducts, product)
			}
		}
	} else {
		searchedProducts = products
	}
	if sortParam := c.Query("sort"); sortParam != "" {
		sortLower := strings.ToLower(sortParam)
		if sortLower == "asc" {
			sort.Slice(searchedProducts, func(i, j int) bool { return searchedProducts[i].Price < searchedProducts[j].Price })
		} else if sortLower == "desc" {
			sort.Slice(searchedProducts, func(i, j int) bool { return searchedProducts[i].Price > searchedProducts[j].Price })
		}
	}
	total := len(searchedProducts)
	perPage := 9
	lastPage := total/perPage + 1
	page := 1
	start := 0
	end := perPage
	if pageQ, err := strconv.Atoi(c.Query("page", "1")); err == nil {
		if pageQ > 0 {
			page = pageQ
			if total <= page*perPage && total >= (page-1)*perPage {
				page = lastPage
				start = (page - 1) * perPage
				end = total
			} else if total >= page*perPage {
				start = (page - 1) * perPage
				end = page * perPage
			} else {
				end = 0
			}
		}
	}
	return c.JSON(fiber.Map{
		"data":      searchedProducts[start:end],
		"total":     total,
		"page":      page,
		"last_page": lastPage,
		"results":   end - start,
	})
}
