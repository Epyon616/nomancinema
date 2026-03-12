# NoMan Cinema

A full-stack cinema booking application built with:

__Frontend:__ React + TypeScript + Vite + TanStack Query
__Backend:__ Node.js + Express
__Database:__ PostgreSQL
__Infrastructure:__ Docker + Docker Compose
__Reverse Proxy:__ Nginx

This project demonstrates clean API design, proper HTTP semantics, schema integrity, centralised error handling, integration testing, and modern frontend server-state management.

Architecture

The application runs as a multi-container Docker setup:

__NoManFe__ – React frontend
__NoManBE__ – Express API server
__database__ – PostgreSQL database
__nginx__ – Reverse proxy

The frontend communicates with the backend via REST endpoints.
The backend uses a shared PostgreSQL connection pool and centralised error middleware.
The database is initialised using schema and seed scripts on first startup.

### Features

* List all movies
* View movie details
* View showtimes per movie
* Create bookings
* Proper HTTP status codes (200 / 201 / 400 / 404 / 500)
* Centralised Express error middleware
* React Query for caching and async state management
* Supertest integration tests for API behaviour
* Fully Dockerised development environment

### Running Locally
1. Create environment variables (root)

Create a .env file in the project root:
```
POSTGRES_DB=nomancinema
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password
POSTGRES_PORT=5432
BE_PORT=3001
VITE_API_URL=http://localhost:3001

```

2. Start the application
```
docker compose up --build
```
If you modify the database schema and need a fresh initialisation:
```
docker compose down -v
docker compose up --build
```

#### Database Structure

Initialisation is split into:
```
database/
01-schema.sql
02-seed.sql
```
Schema enforces:
* Primary keys on all tables
* Foreign key constraints with cascading deletes
* Indexes on relational columns

Seed data is deterministic and resets identity counters.

#### API Endpoints
```
Movies
GET /api/movies
GET /api/movies/:id
GET /api/movies/:id/showings

Bookings
POST /api/movieBookings

Example booking request:

{
"firstName": "Lee",
"lastName": "Smith",
"movieShowingId": 1
}

Successful response:

{
"code": 201,
"message": "Booking confirmed",
"data": { "bookingId": 12 }
}
```
#### Testing

Run tests:
```
cd NoManBe && npm run test
cd NoManFe && npm run test
```
Tests validate:

* Status codes
* Error handling
* Response shape
* Booking validation

#### Design Decisions

* Single shared PostgreSQL pool to avoid duplicated DB configuration
* Centralised error middleware to prevent process crashes
* React Query for server-state management and caching
* Explicit HTTP semantics rather than always returning 200
* Dockerised setup for reproducible development

#### Potential Improvements

* Seat capacity management per showing
* Authentication layer for admin/movie management
* Pagination for larger datasets
* CI pipeline with lint + test checks
* OpenAPI documentation
* Database migrations via a dedicated tool