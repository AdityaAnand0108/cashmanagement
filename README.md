# 💰 Cash Management

A **Spring Boot + React.js** based application to manage personal finances by tracking **daily income and expenses**. The system helps users maintain budgets, analyze spending habits, and improve financial planning.

---

## 🚀 Features

* **Daily Expense Tracking**

  * Add, update, and delete expenses.
  * Track cash flow for a specific date.

* **Budget Management**

  * Set monthly budgets.
  * Compare actual vs. planned spending.

* **Analytics & Reports**

  * Get daily, weekly, and monthly spending summaries.
  * Visualize data with charts and tables.

* **User-Friendly UI**

  * Built with **React.js + Material UI** for a responsive and clean interface.

---

## 🛠️ Tech Stack

**Backend (API Layer):**

* Java 17
* Spring Boot
* Spring Data JPA (Hibernate)
* MySQL (or PostgreSQL)

**Frontend:**

* React.js
* Material UI
* Axios (for API calls)

**Build & Tools:**

* Maven (Backend)
* npm / yarn (Frontend)

---

## 📂 Project Structure

```
cash-management/
│── backend/                # Spring Boot backend
│   ├── src/main/java/com/cash_management
│   │   ├── entity/         # JPA entities
│   │   ├── repository/     # JPA repositories
│   │   ├── service/        # Business logic
│   │   ├── controller/     # REST controllers
│   │   └── dto/            # Data transfer objects
│   └── resources/          # application.properties / YAML
│
│── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Screens (Dashboard, ExpenseForm, etc.)
│   │   ├── services/       # Axios API calls
│   │   └── App.js          # Main app entry
│   └── public/
│
└── README.md
```

---

## ⚙️ Setup Instructions

### Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```
2. Configure **application.properties**:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/cashdb
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   ```
3. Run the backend:

   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the React app:

   ```bash
   npm start
   ```

---

## 📌 API Endpoints

### Expense Management

| Method | Endpoint                        | Description                  |
| ------ | ------------------------------- | ---------------------------- |
| GET    | `/api/spending?date=yyyy-MM-dd` | Get total spending for a day |
| POST   | `/api/spending`                 | Add new expense              |
| PUT    | `/api/spending/{id}`            | Update an expense            |
| DELETE | `/api/spending/{id}`            | Delete an expense            |

---

## 📊 Future Enhancements

* ✅ Multi-user authentication (JWT)
* ✅ Category-based spending analytics
* ✅ Export reports to Excel/PDF
* ✅ Mobile-friendly PWA support

---

## 👨‍💻 Author

**Aditya Anand Mishra**

---
