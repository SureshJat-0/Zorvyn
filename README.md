# Zorvyn - Finance Data Processing and Access Control Backend

A backend API for a finance dashboard system with role-based access control, transaction management, and analytics endpoints.

This project is designed to match the assignment goals around:
- API design
- data modeling
- business logic
- access control
- validation and error handling

## Tech Stack

- Node.js
- Express 5
- MongoDB + Mongoose
- JWT (cookie-based auth)
- Joi (request validation)
- express-rate-limit

## Core Features

- User registration and login
- Role model: `viewer`, `analyst`, `admin`
- User status model: `active`, `inactive`
- Role-based route protection
- Transaction CRUD
- Transaction filtering (type, category)
- Pagination and sorting for transaction listing
- Dashboard analytics:
  - summary totals
  - category breakdown
  - trends
- Unified success/error response format
- Global error and 404 handlers
- Per-route-group rate limiting

## Project Structure

See [foderStructure.md](foderStructure.md).

## Data Models

### User

- `name` (string, required)
- `email` (string, required, unique)
- `password` (string, required, hashed)
- `role` (enum: admin | analyst | viewer)
- `status` (enum: active | inactive)
- timestamps

### Transaction

- `amount` (number, required)
- `type` (enum: income | expense)
- `category` (string, required)
- `date` (date)
- `description` (string, required)
- timestamps

## Access Control Matrix

| Area | Viewer | Analyst | Admin |
|---|---|---|---|
| Auth: register/login | Yes | Yes | Yes |
| Auth: me | Yes | Yes | Yes |
| Users: list/get/update/delete | No | No | Yes |
| Transactions: create/update/delete | No | No | Yes |
| Transactions: list/get by id | No | Yes | Yes |
| Transactions: recent | Yes | Yes | Yes |
| Analytics: summary | Yes | Yes | Yes |
| Analytics: categories/trends | No | Yes | Yes |

## API Base URL

- Local: `http://localhost:3000`
- Live: `https://zorvyn-advc.onrender.com`
- Version prefix: `/api/v1`

Example live endpoint:
- `https://zorvyn-advc.onrender.com/api/v1/auth/me`

## API Testing (No UI)

This project is backend-only and does not include a frontend UI.

Use any API client to test endpoints, such as:
- Postman
- Thunder Client (VS Code extension)
- Insomnia
- Hoppscotch

For authenticated routes:
- Login first using `POST /api/v1/auth/login`
- Reuse the auth cookie (`token`) in subsequent requests

## Authentication Flow

1. Register or login.
2. On successful login, server sets an HTTP-only cookie named `token`.
3. Protected routes read and verify this cookie.
4. Role middleware checks user permissions.

## API Endpoints

### Health

- `GET /`

### Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`

### Users (admin only)

- `GET /api/v1/users`
- `GET /api/v1/users/:id`
- `PATCH /api/v1/users/:id/role`
- `PATCH /api/v1/users/:id/status`
- `DELETE /api/v1/users/:id`

### Transactions

- `POST /api/v1/transactions` (admin)
- `GET /api/v1/transactions` (analyst/admin)
- `GET /api/v1/transactions/recent` (all roles)
- `GET /api/v1/transactions/:id` (analyst/admin)
- `PATCH /api/v1/transactions/:id` (admin)
- `DELETE /api/v1/transactions/:id` (admin)

Supported query params for list endpoint:
- `type`
- `category`
- `page`
- `limit`
- `sortBy`
- `order` (`asc` or `desc`)

### Analytics

- `GET /api/v1/analytics/summary`
- `GET /api/v1/analytics/categories`
- `GET /api/v1/analytics/trends`

## Request Validation

Joi validation is applied for:
- auth register
- auth login
- transaction create
- transaction update

Validation failures return `422`.

## Response Format

### Success

```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "...",
  "error": {}
}
```

## Environment Variables

Copy `.env.example` to `.env` and update values.

For Docker, this project uses `.env.docker` (already included in repo).

Required variables:
- `PORT`
- `NODE_ENV`
- `MONGO_URI`
- `JWT_SECRET`

### Docker Environment File

Create `.env.docker` in project root if it does not exist:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://mongo:27017/zorvyn
JWT_SECRET=your_secret
```

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Seed Data

```bash
npm run seedLocal
```

Seed script creates:
- one admin user
- one analyst user
- one viewer user
- sample transactions

Default seeded email for admin, analyst, viewer:
- `admin@example.com`
- `analyst@example.com`
- `viewer@example.com`

Default seeded password for all seeded users:
- `123456`

## Docker Setup

```bash
docker-compose up --build
```

Docker compose loads backend environment variables from `.env.docker` via `env_file`.

Seed inside Docker:

```bash
npm run seedDocker
```

## Assumptions and Design Notes

- First registered user becomes `admin` if no admin exists.
- Authentication uses secure HTTP-only cookie storage for JWT.
- Categories are open string values, with fallback handling for unknown values in transaction creation logic.
- Rate limits are configured per route group (auth, users, transactions, analytics).
- This implementation focuses on clarity and maintainability over complex abstractions.

## Assignment Mapping

### User and Role Management

Implemented via:
- user model with role/status
- admin user management routes
- role-based middleware checks

### Financial Records Management

Implemented via:
- transaction model
- CRUD endpoints
- filtering, sorting, pagination in list endpoint

### Dashboard Summary APIs

Implemented via:
- summary totals endpoint
- category totals endpoint
- trend endpoint

### Access Control Logic

Implemented via middleware:
- auth check
- admin-only and analyst/admin guards
- all-role guard for common endpoints

### Validation and Error Handling

Implemented via:
- Joi request validators
- async wrapper for controller errors
- centralized error middleware
- not-found middleware

### Data Persistence

Implemented with MongoDB + Mongoose.

## Optional Enhancements Included

- JWT auth
- pagination and sorting
- rate limiting
- seed script for quick demo setup

## Author

Suresh Jat
