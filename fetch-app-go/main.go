package main

import (
	"fetch-app/config"
	"fetch-app/infra"
	"fetch-app/routes"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
    cfg, err := config.LoadConfig()
    if err != nil {
        log.Fatalf("Failed to load configuration: %v", err)
    }
    app := fiber.New()
    redis := infra.InitRedis()
    routes.SetupRoutes(app, redis)
    log.Printf("Starting Fiber server on %s", cfg.AppPort)
    if err := app.Listen(fmt.Sprintf(":%s", cfg.AppPort)); err != nil {
        log.Fatalf("Failed to start server: %v", err)
    }
}
