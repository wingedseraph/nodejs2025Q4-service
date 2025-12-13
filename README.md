# Home Library Service

## Prerequisites

- [Docker](https://docs.docker.com/engine/install/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed
- Docker Hub account created

## Environment Variables

Copy a `.env.example` file to `.env` in the project root:

## Start the application

`docker-compose up --build` The application will be available at `http://localhost:4000`

API documentation: `http://localhost:4000/doc/`

## Stop the application

`docker-compose down`

## Scanning for Vulnerabilities

`npm run docker:scan`

## Development

The application runs in development mode with hot reload. Changes to files in `src/` will automatically restart the application.

## Testing

Run authentication tests (recommended first):

`npm run test:auth`

Run refresh token tests:

`npm run test:refresh`

Run all tests:

`npm run test`

## Run tests inside the container

`docker-compose exec app npm run test:auth`
