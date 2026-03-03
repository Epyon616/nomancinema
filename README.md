# NoMan Cinema

A full-stack cinema booking application built with:

- **Frontend**: React + TypeScript + Vite + TanStack Query
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Infra**: Docker + Docker Compose
- **Reverse Proxy**: Nginx

The project demonstrates clean API design, proper HTTP semantics, schema integrity, error handling, and modern frontend data management patterns.

---

## Architecture

The application runs as a multi-container Docker setup:

- `fe` – React frontend
- `be` – Express API server
- `db` – PostgreSQL database
- `nginx` – Reverse proxy

The frontend communicates with the backend via REST endpoints.  
The backend uses a shared PostgreSQL connection pool and centralised error handling.  
The database is initialised using schema and seed scripts on first startup.

---

## Features

- List all movies
- View movie details
- View showtimes per movie
- Create bookings
- Proper HTTP status codes (200 / 201 / 400 / 404 / 500)
- Centralised Express error middleware
- React Query for caching + async state management
- Supertest integration tests for API behaviour
- Dockerised development environment

---

## Running Locally

### 1. Create environment variables

Create a root `.env` file:


POSTGRES_DB=nomancinema
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password
POSTGRES_PORT=5432

BE_PORT=3001


Frontend `.env`:


MIT