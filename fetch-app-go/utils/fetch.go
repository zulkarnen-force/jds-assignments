package utils

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"fetch-app/config"
	"fetch-app/models"

	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()

var cfg, _ = config.LoadConfig()

func makeGETRequest(url string) (*http.Response, error) {
	client := &http.Client{}
	request, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	response, err := client.Do(request)
	if err != nil {
		return nil, err
	}

	return response, nil
}

// FetchProduct fetches products from an external API
func FetchProduct() ([]models.Product, error) {
	const apiURL = "https://60c18de74f7e880017dbfd51.mockapi.io/api/v1/jabar-digital-services/product"

	response, err := makeGETRequest(apiURL)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	var data []models.Product
	err = json.NewDecoder(response.Body).Decode(&data)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func GetFromCache(redisClient *redis.Client, cacheKey string, result interface{}) error {
	cachedData, err := redisClient.Get(ctx, cacheKey).Result()
	if err != nil {
		return err
	}

	return json.Unmarshal([]byte(cachedData), result)
}

func SetToCache(redisClient *redis.Client, cacheKey string, data interface{}, duration time.Duration) error {
	cacheData, err := json.Marshal(data)
	if err != nil {
		return err
	}

	return redisClient.Set(ctx, cacheKey, cacheData, duration).Err()
}

func GetExchangeRate(redisClient *redis.Client) (float64, error) {
	const cacheKey = "exchange_rate_usd_to_idr"
	const baseUrl = "https://api.exchangerate.host/live?access_key=%s"
	accessKey := cfg.ExchangeRateAccessToken // replace with the actual access key or load from env
	apiURL := fmt.Sprintf(baseUrl, accessKey)
	var exchangeRate float64

	// Try fetching exchange rate from Redis cache
	if err := GetFromCache(redisClient, cacheKey, &exchangeRate); err == nil {
		fmt.Println("Returning cached exchange rate")
		return exchangeRate, nil
	}

	// Fetch exchange rate from API
	response, err := makeGETRequest(apiURL)
	if err != nil {
		return 0, err
	}
	defer response.Body.Close()

	var exchangeRateData map[string]interface{}
	err = json.NewDecoder(response.Body).Decode(&exchangeRateData)
	if err != nil {
		return 0, err
	}

	// Ensure success is true before proceeding
	success, ok := exchangeRateData["success"].(bool)
	if !ok || !success {
		return 0, fmt.Errorf("API response indicates failure")
	}

	// Access quotes map
	quotes, ok := exchangeRateData["quotes"].(map[string]interface{})
	if !ok {
		return 0, fmt.Errorf("invalid quotes format in API response")
	}

	// Get USDIDR exchange rate
	idrRate, ok := quotes["USDIDR"].(float64)
	if !ok {
		return 0, fmt.Errorf("USDIDR exchange rate not found or invalid")
	}

	// Cache the rate for later use
	if err := SetToCache(redisClient, cacheKey, idrRate, time.Hour); err != nil {
		return 0, fmt.Errorf("failed to cache exchange rate: %v", err)
	}

	return idrRate, nil
}
