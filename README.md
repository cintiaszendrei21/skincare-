# Skincare training app

A deliberately small full-stack starting point for learning how a React application communicates with a Spring Boot API. It prepares the tooling and structure, but leaves the skincare and cosmetics domain for you to design and implement.

## Architecture

```text
Browser
   |
React + TypeScript
   | HTTP / JSON
Spring MVC Controller
   |
Service
   |
Repository
   |
JPA
   |
H2 database
```

The existing `hello` feature deliberately has only a Controller. Its endpoint returns a fixed message, so it has neither business logic for a Service nor data access for a Repository. A real feature should keep related code together, for example `product/Product.java`, `ProductRepository.java`, `ProductService.java`, and `ProductController.java`.

- A **Controller** accepts HTTP requests and returns HTTP responses.
- A **Service** holds business rules and coordinates work for a feature.
- A **Repository** reads and writes data through JPA.
- An **Entity** is a Java class mapped to a database table.
- A **DTO** is a small object used to send or receive API data without exposing an Entity directly.

## Prerequisites

- Git
- Java 25 JDK
- Node.js 24 LTS

You do **not** need to install Maven globally, create a database account, configure database credentials, or use Docker.

## Backend database

The backend uses a local, persistent H2 file database to keep the learning environment simple. Database files are created under `backend/data/` when the backend starts and are ignored by Git, so data survives restarts but is not committed.

JPA is the Java persistence abstraction used by the application. H2 is the database currently storing the data. A later PostgreSQL exercise would mainly change configuration, driver dependencies, and potentially SQL compatibility; the Controller / Service / Repository architecture remains the same.

The H2 console is a teaching aid for looking at tables and data:

```text
URL:      http://localhost:8080/h2-console
JDBC URL: jdbc:h2:file:./data/skincare
User:     sa
Password: leave empty
```

The JDBC path is relative to the backend working directory. Start the backend from `backend/`, and the database files will be stored in `backend/data/`.

Hibernate validates the schema (`ddl-auto=validate`) and never creates or updates it. Flyway owns schema changes. There are no domain tables or meaningful migrations yet; when you introduce your first real feature, add its Flyway migration under `backend/src/main/resources/db/migration`.

Validation errors from future validated request DTOs use RFC 9457 Problem Details with a `VALIDATION_ERROR` code and a `fieldErrors` extension.

## Backend setup

Windows PowerShell:

```powershell
cd backend
.\mvnw.cmd clean verify
.\mvnw.cmd spring-boot:run
```

macOS/Linux:

```sh
cd backend
chmod +x mvnw
./mvnw clean verify
./mvnw spring-boot:run
```

`APP_FRONTEND_ORIGIN` is optional and defaults to `http://localhost:5173`.

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
- H2 console: <http://localhost:8080/h2-console>

The backend test is a focused MVC slice test (`@WebMvcTest`) and does not need a database. Frontend tests use Vitest and React Testing Library; they mock `fetch` at the network boundary. The current testing progression is:

```text
Service: JUnit + Mockito
Controller: @WebMvcTest / MockMvc
Database integration: later, with a real database
End-to-end: later, when meaningful user journeys exist
```

GitHub Actions runs both applications' checks without external database credentials.

## Where to go next

Build the first genuine domain feature yourself. Include a Flyway migration, Entity, Repository, Service, DTO, Controller, tests, and a React UI. Do not add layers merely because they exist in this diagram: each layer should serve a clear purpose in the feature.
