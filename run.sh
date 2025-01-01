#!/bin/bash


# Start the application
echo "Start the application auth-node"
docker compose -f auth-node/docker-compose.yml down -vvv --remove-orphans
docker compose -f auth-node/docker-compose.yml up -d --build

echo "Start the application fetch-app-go"
docker compose -f fetch-app-go/docker-compose.local.yml down -vvv  --remove-orphans
docker compose -f fetch-app-go/docker-compose.local.yml up -d --build