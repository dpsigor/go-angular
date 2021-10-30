package database

import (
	"ambassador/src/models"
	"fmt"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	var err error
	DB, err = gorm.Open(mysql.Open("root:root@tcp(db:3306)/ambassador"), &gorm.Config{})
	if err != nil {
		log.Fatalf("could not connect with database! Err: \n%v\n", err)
	}
}

func AutoMigrate() {
	err := DB.AutoMigrate(models.User{}, models.Product{}, models.Link{}, models.Order{}, models.OrderItem{})
	if err != nil {
		fmt.Println(err)
	}
}
