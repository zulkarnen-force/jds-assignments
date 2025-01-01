package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, using system environment variables")
	}
}

type Config struct {
	AppPort string
	RedisPort string
	JWTSecret        string
	RedisPassword string
		RedisHost string
		ExchangeRateAccessToken string
}

func LoadConfig() (*Config, error) {
	LoadEnv()

	config := &Config{
		AppPort: "8080", 
		RedisPort: "6379",
		RedisPassword: "redis@secret",
		RedisHost: "jds.redis",
		JWTSecret: "supersecret",
		ExchangeRateAccessToken: "56498ee3d820514dff29dad99deb37f7",
	}

	if value := os.Getenv("APP_PORT"); value != "" {
		config.AppPort = value
	}

	if value := os.Getenv("REDIS_PORT"); value != "" {
		config.RedisPort = value
	}

	if value := os.Getenv("REDIS_PORT"); value != "" {
		config.JWTSecret = value
	}

	if value := os.Getenv("REDIS_HOST"); value != "" {
		config.RedisHost = value
	}

	if value := os.Getenv("REDIS_PASSWORD"); value != "" {
		config.RedisPassword = value
	}
	
	if value := os.Getenv("EXCHANGE_RATE_ACCESS_TOKEN"); value != "" {
		config.ExchangeRateAccessToken = value
	}

	fmt.Println(map[string]string{
		"AppPort": config.AppPort,
		"RedisPort": config.RedisPort,
		"JWTSecret": config.JWTSecret,
		"RedisPassword": config.RedisPassword,
		"RedisHost": config.RedisHost,
		"ExchangeRateAccessToken": config.ExchangeRateAccessToken,
	})

	return config, nil
}
