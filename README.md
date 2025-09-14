💰 Cash Management Application

A simple Spring Boot application to track daily expenses. This project is designed for learning purposes and demonstrates a layered architecture with Controller → Service → Repository → Entity → DTO pattern.

🚀 Features

Add and manage daily expenses

Categorize expenses (Food, Transport, Rent, Utilities, Entertainment, Other) using Enums

Retrieve and display all expenses

RESTful API design with Spring Web

Layered architecture for maintainability

DTO + Entity mapping with MapStruct

🏗️ Project Structure
cashmanagement
 ├── src/main/java/com/cash_management/cashmanagement
 │    ├── config          # Config classes (e.g., MapperConfig for MapStruct)
 │    ├── controller      # REST controllers (ExpenseController)
 │    ├── dto             # Data Transfer Objects (DailyexpensesDTO)
 │    ├── entity          # JPA Entities (Dailyexpenses)
 │    ├── enums           # Enums (ExpenseCategory)
 │    ├── repository      # JPA Repositories (DailyexpensesRepository)
 │    ├── service         # Service interfaces & implementations
 │    └── CashmanagementApplication.java  # Main Spring Boot app
 │
 ├── src/main/resources
 │    ├── application.properties   # DB and project configuration
 │    ├── static                   # Static resources (if any)
 │    └── templates                # Thymeleaf templates (optional)
 │
 ├── test   # Unit & integration tests
 └── README.md

⚙️ Tech Stack

Java 17+

Spring Boot 3.x

Spring Data JPA

MapStruct (for DTO mapping)
H2 / MySQL / PostgreSQL (configurable)

Maven

📦 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/cashmanagement.git
cd cashmanagement

2️⃣ Configure Database (application.properties)
spring.datasource.url=jdbc:mysql://localhost:3306/cash_management
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

3️⃣ Run the application
mvn spring-boot:run


The app will start at:
👉 http://localhost:8080


🔮 Future Enhancements

Add authentication with Spring Security + JWT

Generate monthly expense reports

Export data to PDF/Excel

Add React frontend for visualization

👨‍💻 Author

Aditya Anand Mishra
