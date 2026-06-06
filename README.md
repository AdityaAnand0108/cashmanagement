# CashIQ — Personal Finance Manager

A full-stack personal finance application for tracking income, expenses, budgets, debts, and savings goals — with an AI-powered insight engine backed by a locally running LLM.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript, Vite, Material UI v7, Recharts |
| Backend | Spring Boot 3.3.5, Java 21, Spring Security + JWT |
| Database | MySQL |
| AI | Spring AI + Ollama (local LLM — llama3.2) |
| AI Categorizer | Python (separate microservice) |

---

## Project Structure

```
cashmanagement/
├── CASHIQ-CASHMANAGEMENT-REACT-FRONTEND/   # React + TypeScript SPA
├── CASHIQ-CASHMANAGEMENT-MICROSERVICES/
│   ├── CASHIQ-CASHMANAGEMENT-MANAGE-CORE/  # Spring Boot REST API
│   └── CASHIQ-CASHMANAGEMENT-AI-CATEGORIZER/ # Python ML categorizer
├── CASHIQ-CASHMANAGEMENT-UI-UX-WIREFRAME/  # Design mockups
└── CASHIQ-CASHMANAGEMENT-UML-DIAGRAM/      # Architecture diagrams
```

---

## Features

- **Dashboard** — overview metrics, recent transactions, at-risk budgets, goal progress
- **Transactions** — add, edit, delete with category tagging
- **Income Sources** — track multiple income streams with frequency and trend charts
- **Budget Caps** — monthly or custom-period limits per category with live spend tracking
- **Savings Goals** — create goals, add funds, track completion
- **Debts & IOUs** — manage money owed and money lent
- **AI Insights** — ask natural-language questions about your finances (Ollama/llama3.2)

---

## Running Locally

### Prerequisites

- Java 21, Maven
- Node.js 18+
- MySQL running on port `3306`
- [Ollama](https://ollama.com) running with `llama3.2` model pulled

### Backend

```bash
cd CASHIQ-CASHMANAGEMENT-MICROSERVICES/CASHIQ-CASHMANAGEMENT-MANAGE-CORE

# Edit src/main/resources/application.properties:
# spring.datasource.url=jdbc:mysql://localhost:3306/cashiq_db
# spring.datasource.username=root
# spring.datasource.password=your_password

mvn spring-boot:run
# Runs on http://localhost:8080
# Swagger UI: http://localhost:8080/swagger-ui.html
```

### Frontend

```bash
cd CASHIQ-CASHMANAGEMENT-REACT-FRONTEND

# Create .env file:
# VITE_API_BASE_URL=http://localhost:8080

npm install
npm run dev
# Runs on http://localhost:5173
```

### Ollama (AI features)

```bash
ollama pull llama3.2
ollama serve
# Runs on http://localhost:11434
```

---

## API Overview

All endpoints (except `/auth/**`) require a `Bearer <JWT>` header.

| Domain | Base Path |
|---|---|
| Auth | `/auth/register-user`, `/auth/login` |
| Transactions | `/add-transaction`, `/get-all-transaction`, `/update-transaction`, `/delete-transaction/{id}` |
| Income | `/add-income`, `/get-all-income`, `/update-income/{id}`, `/delete-income/{id}` |
| Budgets | `/api/budget/add/{userId}`, `/api/budget/user/{userId}` |
| Savings Goals | `/api/saving-goals/{userId}` |
| Debts | `/api/debts` |
| AI Insights | `/api/ai/insights/analyze` |

Full API docs available at `http://localhost:8080/swagger-ui.html` when the backend is running.

---

## Environment Variables

| Variable | Where | Description |
|---|---|---|
| `VITE_API_BASE_URL` | Frontend `.env` | Backend base URL |
| `app.cors.allowed-origins` | `application.properties` | Allowed frontend origins (comma-separated) |
| `spring.ai.ollama.base-url` | `application.properties` | Ollama server URL |

---

## Author

**Aditya Anand Mishra**
