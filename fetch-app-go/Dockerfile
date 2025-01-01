# Base stage for dependencies
FROM golang:1.23.4 AS base

WORKDIR /app

# Copy go.mod and go.sum and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy application code
COPY . .

# Build stage for production
FROM base AS builder

ENV GO111MODULE=on \
     CGO_ENABLED=0 \
     GOOS=linux \
     GOARCH=amd64 \
     FIBER_ENV=production

# Build the application binary
RUN go build -o /app/main main.go

# Minimal image for production
FROM alpine:latest AS release
WORKDIR /root
COPY --from=builder /app/main .

EXPOSE 8080
CMD ["./main"]

# Development stage with hot reload
FROM base AS development

# Install air for hot reload
RUN go install github.com/air-verse/air@latest
# Expose port for development
EXPOSE 8080

# Command for hot reload
CMD ["air"]