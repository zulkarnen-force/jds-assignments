package models

import "time"

// Product represents the structure of a product
type Product struct {
	ID         string    `json:"id"`
	CreatedAt  time.Time `json:"createdAt"`
	Price       string `json:"price"` // Change Price type to string
	Department string    `json:"department"`
	Product    string    `json:"product"`
	PriceIDR   float64   `json:"priceIDR,string"`
}