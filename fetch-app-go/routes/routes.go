package routes

import (
	"fetch-app/handlers"
	middleware "fetch-app/middlewares"

	"github.com/gofiber/fiber/v2"
	"github.com/redis/go-redis/v9"
)

func SetupRoutes(app *fiber.App, redisClient *redis.Client) {
	app.Get("/products/aggregated", middleware.RequireAdminRole, func(c *fiber.Ctx) error {
		return handlers.GetAggregatedProducts(c, redisClient)
	})
	app.Get("/products", middleware.ValidateJWT, func(c *fiber.Ctx) error {
		return handlers.GetProducts(c, redisClient)
	})
}
