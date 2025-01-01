package handlers

import (
	"fetch-app/models"
	"fetch-app/utils"
	"sort"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/redis/go-redis/v9"
)

func GetProducts(c *fiber.Ctx, redisClient *redis.Client) error {
	products, err := utils.FetchProduct()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to fetch products"})
	}

	exchangeRate, err := utils.GetExchangeRate(redisClient)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to fetch exchange rate"})
	}

	productsWithIDR := utils.ConvertPricesToIDR(products, exchangeRate)

	return c.JSON(fiber.Map{
		"data": productsWithIDR,
	})
}

func GetAggregatedProducts(c *fiber.Ctx, redisClient *redis.Client) error {
	products, err := utils.FetchProduct()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to fetch products"})
	}

	exchangeRate, err := utils.GetExchangeRate(redisClient)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to fetch exchange rate"})
	}

	var productList []models.Product
	for _, product := range products {
		department := product.Department
		productName := product.Product
		price := product.Price
		id := product.ID
		createdAt := product.CreatedAt 

		priceFloat, err := strconv.ParseFloat(price, 64)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "failed to convert price to float"})
		}

		priceIDR := priceFloat * exchangeRate

		productStruct := models.Product{
			ID:         id,
			CreatedAt:  createdAt,
			Price:      price,
			Department: department,
			Product:    productName,
			PriceIDR:   priceIDR, 
		}
		productList = append(productList, productStruct)
	}

	aggregatedData := make(map[string]map[string][]models.Product)

	for _, product := range productList {
		if _, exists := aggregatedData[product.Department]; !exists {
			aggregatedData[product.Department] = make(map[string][]models.Product)
		}

		aggregatedData[product.Department][product.Product] = append(aggregatedData[product.Department][product.Product], product)
	}

	for department, productsMap := range aggregatedData {
		for productName, productsList := range productsMap {
			sort.Slice(productsList, func(i, j int) bool {
				return productsList[i].PriceIDR < productsList[j].PriceIDR
			})
			aggregatedData[department][productName] = productsList
		}
	}

	return c.JSON(fiber.Map{
		"data": aggregatedData,
	})
}
