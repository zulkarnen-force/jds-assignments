# JDS Assignment

Dedicated to Jawa Barat Digial Service Assigment. This monorepo contains two services:

- `auth-node`: A Node.js application for authentication (Express).
- `fetch-app-go`: A Go-based application using the Go Fiber framework.

Both applications are set up with Docker, allowing you to easily build and run them in isolated containers.

## Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Git](https://git-scm.com/)

## Setting Up the Environment

Clone the repository:

```bash
git clone https://github.com/zulkarnen-force/jds-assignments.git
cd jds-assignments
```

Running the Services Locally

```sh
chmod +x ./run.sh
./run.sh
```

This will build and start container. Make sure the container's is up

The Auth Node running on

```
http://localhost:30000
```

and Fetch App Go running on

```
http://localhost:8080
```

## Example

### Auth Node

```sh
curl -X 'POST' \
  'http://localhost:30000/v1/auth/register' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "admin",
  "nik": "1111111111111111"
}'
```

```json
{
  "success": true,
  "message": "Data successfully saved.",
  "data": {
    "name": "admin",
    "nik": "1111111111111111",
    "role": "admin",
    "password": "osv10i"
  }
}
```

### Login

```sh
curl --location 'http://localhost:30000/v1/auth/login' \
--header 'Content-Type: application/json' \
--data '{
  "nik":"1111111111111111",
  "password":"osv10i"
}'
```

```json
{
  "success": true,
  "message": "Data succesfully found.",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJuaWsiOiIxMTExMTExMTExMTExMTExIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM1NzEyNTMxLCJleHAiOjE3MzU3OTg5MzEsImlzcyI6ImpkcyJ9.CccrV6ISufZsfX70O7CG_jhemtOb-HYLshqpx0hvrbc",
    "expires_in": "24h"
  }
}
```

### Get Claim Data

```sh
curl --location 'http://localhost:30000/v1/auth/me' \
--header 'Authorization: Bearer <bearer_token>'
```

```json
{
  "success": true,
  "message": "Data succesfully found.",
  "data": {
    "name": "admin",
    "nik": "1111111111111111",
    "role": "admin",
    "iat": 1735712531,
    "exp": 1735798931,
    "iss": "jds"
  }
}
```

## Fetch App Go

### Get Product's

```sh
curl --location 'http://localhost:8080/products' \
--header 'Authorization: Bearer <bearer_token>
```

```json
{

    "data": [
        {
            "id": "1",
            "createdAt": "2021-06-09T09:37:05.527Z",
            "price": "218.00",
            "department": "Outdoors",
            "product": "Salad",
            "priceIDR": "3536123.5"
        },
        ...
    ]
}
```

### Get Product's has Aggragated

```sh
curl --location 'http://localhost:8080/products/aggregated' \
--header 'Authorization: Bearer  <bearer_token>'
```

```json
{
  "data": {
    "Automotive": {
      "Bike": [
        {
          "id": "3",
          "createdAt": "2021-06-09T11:17:38.575Z",
          "price": "652.00",
          "department": "Automotive",
          "product": "Bike",
          "priceIDR": "10575929"
        }
      ]
    }
  }
}
```

## Running Tests

### Running Test for Auth App Node

```
docker compose -f auth-node/docker-compose.local.yml run jds.auth npm run test
```

### Running Test for Fetch App Go

```sh
docker compose -f fetch-app-go/docker-compose.local.yml run jds.fetch.app go test -cover ./...
```

Or

```
chmod -x ./tests.sh
./tests.sh
```
