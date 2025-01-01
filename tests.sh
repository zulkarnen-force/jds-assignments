#!/bin/bash


# Start the application
echo "Start the application auth-node"
docker compose -f auth-node/docker-compose.local.yml down -vvv --remove-orphans
docker compose -f auth-node/docker-compose.local.yml build
docker compose -f auth-node/docker-compose.local.yml run jds.auth npm run test


# Start the application
echo "Start the application fetch-app-go"
docker compose -f fetch-app-go/docker-compose.local.yml down -vvv  --remove-orphans
docker compose -f fetch-app-go/docker-compose.local.yml build
docker compose -f fetch-app-go/docker-compose.local.yml run jds.fetch.app go test -cover ./...
