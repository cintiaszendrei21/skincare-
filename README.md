# Skincare training app

A deliberately small full-stack starting point for learning how a React application communicates with a Spring Boot API. It prepares the tooling and structure, but leaves the skincare and cosmetics domain for you to design and implement.

## Architecture

```text
Browser
   ↓
React + TypeScript
   ↓ HTTP / JSON
Spring MVC Controller
   ↓
Service
   ↓
Repository
   ↓
JPA
   ↓
PostgreSQL
```

The existing `hello` feature deliberately has only a Controller. Its endpoint returns a fixed message, so it has neither business logic for a Service nor data access for a Repository. A real feature should keep related code together, for example `product/Product.java`, `ProductRepository.java`, `ProductService.java`, and `ProductController.java`.

- A **Controller** accepts HTTP requests and returns HTTP responses.
- A **Service** holds business rules and coordinates the work needed for a feature.
- A **Repository** reads and writes data through JPA.
- An **Entity** is a Java class mapped to a database table.
- A **DTO** is a small object used to send or receive API data without exposing an Entity directly.

## Prerequisites

- Git
- Java 25 JDK
- Node.js 24 LTS
- Neon PostgreSQL credentials

You do **not** need to install Maven globally: the backend includes Maven Wrapper.

## Backend setup

The backend connects only to PostgreSQL. It does not fall back to an in-memory database. Copy the values from `backend/.env.example` into your terminal or IDE run configuration; Spring Boot does not automatically read `.env` files.

Required variables:

```text
DB_URL=jdbc:postgresql://HOST/DATABASE?sslmode=require
DB_USERNAME=YOUR_NEON_USERNAME
DB_PASSWORD=YOUR_NEON_PASSWORD
```

`APP_FRONTEND_ORIGIN` is optional and defaults to `http://localhost:5173`.

Windows PowerShell:

```powershell
$env:DB_URL = 'jdbc:postgresql://HOST/DATABASE?sslmode=require'
$env:DB_USERNAME = 'YOUR_NEON_USERNAME'
$env:DB_PASSWORD = 'YOUR_NEON_PASSWORD'
cd backend
.\mvnw.cmd clean verify
.\mvnw.cmd spring-boot:run
```

macOS/Linux:

```sh
export DB_URL='jdbc:postgresql://HOST/DATABASE?sslmode=require'
export DB_USERNAME='YOUR_NEON_USERNAME'
export DB_PASSWORD='YOUR_NEON_PASSWORD'
cd backend
chmod +x mvnw
./mvnw clean verify
./mvnw spring-boot:run
```

Hibernate validates the schema (`ddl-auto=validate`) and never creates or updates it. Flyway owns schema changes. There are no domain tables or meaningful migrations yet; when you introduce your first real feature, add its first Flyway migration under `backend/src/main/resources/db/migration`.

Validation errors from future validated request DTOs use RFC 9457 Problem Details with a `VALIDATION_ERROR` code and a `fieldErrors` extension.

## Frontend setup

In a separate terminal:

```sh
cd frontend
npm install
npm run dev
```

Vite runs on port 5173 and proxies `/api` requests to the backend at port 8080. The page calls `GET /api/hello` with native `fetch`, then displays loading, success, or error feedback.

## Verification

After both applications are running, open:

- Frontend: <http://localhost:5173>
- Hello API: <http://localhost:8080/api/hello>
- Health: <http://localhost:8080/actuator/health>
- Swagger UI: <http://localhost:8080/swagger-ui/index.html>
- OpenAPI JSON: <http://localhost:8080/v3/api-docs>

The backend test is a focused MVC slice test (`@WebMvcTest`) and does not need Neon. Frontend tests use Vitest and React Testing Library; they mock `fetch` at the network boundary. The current testing progression is:

```text
Service: JUnit + Mockito
Controller: @WebMvcTest / MockMvc
Database integration: Testcontainers + real PostgreSQL (later)
End-to-end: later, when meaningful user journeys exist (for example with Playwright)
```

GitHub Actions runs both applications’ checks without Neon credentials.

## Where to go next

Build the first genuine domain feature yourself. Include a Flyway migration, Entity, Repository, Service, DTO, Controller, tests, and a React UI. Do not add layers merely because they exist in this diagram: each layer should serve a clear purpose in the feature.
