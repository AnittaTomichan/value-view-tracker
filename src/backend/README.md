
# Expense Tracker Backend (Spring Boot)

This is the backend API for the Expense Tracker application built using Spring Boot.

## Features

- User Authentication (JWT-based)
- Expense Management
- Budget Management
- Reports Generation

## Technologies Used

- Java 17
- Spring Boot 3.2.0
- Spring Security with JWT
- Spring Data JPA
- H2 Database (for development)
- Lombok

## Getting Started

### Prerequisites

- Java JDK 17 or higher
- Maven

### Installation

1. Clone the repository
2. Navigate to the backend directory
3. Run the application using Maven:

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`.

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Authenticate a user and get JWT token

### Expenses

- `GET /api/expenses` - Get all expenses for the authenticated user
- `GET /api/expenses/{id}` - Get a specific expense
- `POST /api/expenses` - Create a new expense
- `PUT /api/expenses/{id}` - Update an existing expense
- `DELETE /api/expenses/{id}` - Delete an expense
- `GET /api/expenses/by-date` - Get expenses by date range
- `GET /api/expenses/by-category` - Get expenses by category

### Budgets

- `GET /api/budgets` - Get all budgets for the current month (or specified month)
- `POST /api/budgets` - Create or update a budget
- `DELETE /api/budgets/{id}` - Delete a budget

## Default User

A demo user is created automatically with the following credentials:

- Email: demo@example.com
- Password: password

## Database

The application uses an in-memory H2 database for development. You can access the H2 console at `http://localhost:8080/h2-console` with the following details:

- JDBC URL: `jdbc:h2:mem:expensedb`
- Username: `sa`
- Password: (leave empty)

## Connecting Frontend to Backend

In your frontend React application, update the API endpoints to point to this Spring Boot backend:

```javascript
// Example API URL
const API_URL = 'http://localhost:8080/api';
```
