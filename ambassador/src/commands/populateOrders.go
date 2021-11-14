package main

import (
	"ambassador/src/database"
	"ambassador/src/models"
	"math/rand"

	"github.com/bxcodec/faker/v3"
)

func main() {
	database.Connect()
	for i := 0; i < 30; i++ {
		var orderItems []models.OrderItem

		for j := 0; j < rand.Intn(4)+2; j++ {
			price := float64(rand.Intn(90) + 10)
			qtd := uint(rand.Intn(5))
			orderItems = append(orderItems, models.OrderItem{
				ProductTitle:      faker.Word(),
				Price:             price,
				Quantity:          qtd,
				AdminRevenue:      0.9 * price * float64(qtd),
				AmbassadorRevenue: 0.1 * price * float64(qtd),
			})
		}

		database.DB.Create(&models.Order{
			TransactionId:   "",
			UserId:          uint(rand.Intn(30) + 8),
			Code:            faker.Username(),
			AmbassadorEmail: faker.Email(),
			FirstName:       faker.FirstName(),
			LastName:        faker.LastName(),
			Email:           faker.Email(),
			Complete:        true,
			OrderItems:      orderItems,
		})
	}
}
