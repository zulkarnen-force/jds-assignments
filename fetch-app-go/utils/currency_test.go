package utils

import (
	"fetch-app/models"
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestConvertPricesToIDR(t *testing.T) {
	products := []models.Product{
		{Price: "10.5", PriceIDR: 0},
		{Price: "20.3", PriceIDR: 0},
	}

	exchangeRate := 15000.0

	expected := []models.Product{
		{Price: "10.5", PriceIDR: 157500.0},
		{Price: "20.3", PriceIDR: 304500.0},
	}

	result := ConvertPricesToIDR(products, exchangeRate)

	fmt.Println(result)

	assert.Equal(t, len(expected), len(result))
	for i, product := range expected {
		assert.Equal(t, product.PriceIDR, result[i].PriceIDR)
	}

	invalidProduct := []models.Product{{Price: "invalid"}}
	assert.Nil(t, ConvertPricesToIDR(invalidProduct, exchangeRate))
}
