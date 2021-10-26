package database

import (
	"ambassador/src/models"
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
	DB.AutoMigrate(models.User{})
}
