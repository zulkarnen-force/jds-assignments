package utils

import (
	"fetch-app/models"
	"strconv"
)
func ConvertPricesToIDR(products []models.Product, exchangeRate float64) []models.Product {

	for i, product := range products {
		// Convert price from USD to IDR
		price, err := strconv.ParseFloat(product.Price, 64)
		if err != nil {
			return nil
		}
		priceIDR  := price * exchangeRate
		// Update the PriceIDR field
		products[i].PriceIDR = priceIDR
	}
	return products
}