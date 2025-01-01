package infra

import (
	"context"
	"fetch-app/config"
	"fmt"
	"log"

	"github.com/redis/go-redis/v9"
)

func InitRedis() *redis.Client {
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	redisPassword := cfg.RedisPassword
	redisHost := cfg.RedisHost
	redisPort := cfg.RedisPort

	redisAddr := fmt.Sprintf("%s:%s", redisHost, redisPort)

	client := redis.NewClient(&redis.Options{
		Addr:     redisAddr,
		Password: redisPassword,
		DB:       0,
	})

	err = client.Ping(context.Background()).Err()
	
	if err != nil {
		panic(err)
	}

	return client
}