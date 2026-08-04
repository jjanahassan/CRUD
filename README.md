# Task API - Database Edition

A simple RESTful CRUD API for managing tasks, built using **Node.js**, **Express.js**, **SQLite**, and documented with **Swagger UI**.

## 📋 Overview

Task API is a lightweight backend application that demonstrates a complete CRUD (Create, Read, Update, Delete) system with **persistent database storage**. Unlike the in-memory version, your data survives server restarts because it is stored in a SQLite database.

This project was developed as a learning project to practice:

- Building RESTful APIs
- Handling HTTP methods and status codes
- Creating API documentation using Swagger
- Structuring backend applications with Express.js
- Working with JSON-based request and response handling
- SQLite database integration for persistent storage
- Parameterized SQL queries for security
- Exploring databases with DB Browser for SQLite

---

## ✨ Features

- ✅ Complete CRUD operations for tasks
- ✅ RESTful API architecture
- ✅ Persistent SQLite database storage
- ✅ Automatic database and table creation
- ✅ Automatic seeding of sample tasks
- ✅ Parameterized SQL queries to prevent SQL injection
- ✅ Interactive Swagger UI documentation
- ✅ JSON request and response format
- ✅ Proper HTTP status codes

---

## 🗄️ Why SQLite?

SQLite was chosen because it is:

- **Serverless** – No database server installation required
- **Single-file database** – Everything is stored in one portable file (`tasks.db`)
- **Zero configuration** – Ready to use immediately
- **Persistent** – Data survives server restarts
- **Lightweight** – Ideal for learning projects and small applications
- **Easy to integrate** using the `better-sqlite3` package

---

# 🚀 Getting Started

## Prerequisites

Before running the project, make sure you have installed:

- Node.js (v14 or higher)
- npm (comes with Node.js)

Verify the installation:

```bash
node -v
npm -v
```

---

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/jjanahassan/CRUD.git
```

Navigate to the project directory:

```bash
cd CRUDAPI-node
```

Install the project dependencies:

```bash
npm install
```

---

# ▶️ Running the Server

Start the application:

```bash
node server.js
```

The server will run at:

```
http://localhost:3000
```

On the first run you should see something similar to:

```
Database seeded.
Database connected successfully.
Server running on http://localhost:3000
Swagger UI available at http://localhost:3000/docs
```

That's it! The application automatically creates the SQLite database if it does not already exist.

---

## 🆕 First-Time Setup

When the application starts for the first time, it automatically:

- Creates the `tasks.db` database
- Creates the `tasks` table
- Seeds three example tasks (only if the table is empty)

No manual database setup is required.

---

# 📚 Swagger API Documentation

Swagger UI provides interactive API documentation where every endpoint can be tested directly.

Open:

```
http://localhost:3000/docs
```

Click **Try it out** to send requests directly from your browser.

---

# 🔗 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Returns API information |
| GET | `/hello` | Test endpoint |
| GET | `/health` | Health check |
| GET | `/tasks` | Retrieve all tasks |
| GET | `/tasks/:id` | Retrieve a task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

---

# 📦 Database Schema

The application uses a single table called **tasks**.

| Column | Type | Description |
|---------|------|-------------|
| id | INTEGER PRIMARY KEY AUTOINCREMENT | Auto-generated task ID |
| title | TEXT NOT NULL | Task title |
| done | INTEGER DEFAULT 0 | Task status (0 = pending, 1 = completed) |

---

## API Response Format

```json
{
  "id": 1,
  "title": "Complete backend documentation",
  "done": 0
}
```

| Field | Type | Description |
|------|------|-------------|
| id | Integer | Auto-generated unique identifier |
| title | String | Task description |
| done | Integer | 0 = Pending, 1 = Completed |

---

# 🔧 API Usage Examples

## Create a Task

### Request

```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{"title":"Learn SQLite"}'
```

### Response

```json
{
  "id": 4,
  "title": "Learn SQLite",
  "done": 0
}
```

**Status Code:** `201 Created`

---

## Get All Tasks

### Request

```bash
curl http://localhost:3000/tasks
```

### Response

```json
[
  {
    "id": 1,
    "title": "Finish stage 0",
    "done": 0
  },
  {
    "id": 2,
    "title": "Run my program",
    "done": 1
  },
  {
    "id": 3,
    "title": "Connect to database",
    "done": 0
  }
]
```

**Status Code:** `200 OK`

---

## Get a Task by ID

### Request

```bash
curl http://localhost:3000/tasks/1
```

### Response

```json
{
  "id": 1,
  "title": "Finish stage 0",
  "done": 0
}
```

**Status Code:** `200 OK`

If the task does not exist:

```json
{
  "error": "Task 999 not found"
}
```

**Status Code:** `404 Not Found`

---

## Update a Task

### Request

```bash
curl -X PUT http://localhost:3000/tasks/1 \
-H "Content-Type: application/json" \
-d '{"title":"Updated task","done":1}'
```

### Response

```json
{
  "id": 1,
  "title": "Updated task",
  "done": 1
}
```

**Status Code:** `200 OK`

---

## Delete a Task

### Request

```bash
curl -X DELETE http://localhost:3000/tasks/4
```

### Response

```
No Content
```

**Status Code:** `204 No Content`

---

# 🧪 CRUD Testing Flow

```bash
# Create a task
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{"title":"Test CRUD"}'

# Retrieve all tasks
curl http://localhost:3000/tasks

# Update the task
curl -X PUT http://localhost:3000/tasks/4 \
-H "Content-Type: application/json" \
-d '{"done":1}'

# Retrieve the updated task
curl http://localhost:3000/tasks/4

# Delete the task
curl -X DELETE http://localhost:3000/tasks/4

# Confirm deletion
curl http://localhost:3000/tasks
```

---

# 🗄️ Exploring the Database

You can inspect the database using **DB Browser for SQLite**.

Steps:

1. Open **DB Browser for SQLite**
2. Open the `tasks.db` file
3. Browse the data
4. Execute SQL queries
5. Save changes directly to the database

Since both the API and DB Browser use the same database file, changes made in either place are immediately reflected in the other.

---

## Example SQL Queries

Retrieve all tasks:

```sql
SELECT * FROM tasks;
```

Retrieve completed tasks:

```sql
SELECT * FROM tasks WHERE done = 1;
```

Count all tasks:

```sql
SELECT COUNT(*) FROM tasks;
```

Find tasks containing the word "stage":

```sql
SELECT * FROM tasks
WHERE title LIKE '%stage%';
```

---

# 📸 Screenshots

## Swagger UI

[Swagger UI](swagger-ui.png)

## DB Browser

[DB Browser](db-browser.png)

---

# 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | Backend web framework |
| SQLite | Embedded database |
| better-sqlite3 | SQLite driver |
| Swagger UI Express | Interactive API documentation |
| Swagger JSDoc | OpenAPI specification generation |

---

# 📁 Project Structure

```text
CRUDAPI-node/
│
├── server.js
├── db.js
├── tasks.db
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
├── swagger-screenshot.png
└── db-browser-screenshot.png
```

---

# 📊 HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 OK | Request successful |
| 201 Created | Resource created successfully |
| 204 No Content | Successful request with no response body |
| 400 Bad Request | Invalid request |
| 404 Not Found | Resource not found |
| 500 Internal Server Error | Internal server error |

---

# 🚧 Future Improvements

Possible future enhancements include:

- ☐ Filter tasks (`GET /tasks?done=true`)
- ☐ Search tasks (`GET /tasks?search=milk`)
- ☐ Sort tasks (`GET /tasks?sort=title`)
- ☐ Add timestamps (`created_at`, `updated_at`)
- ☐ Environment variable configuration
- ☐ Unit and integration testing
- ☐ Request validation middleware
- ☐ Authentication and authorization
- ☐ API rate limiting

---

# 📖 Resources

- Express.js Documentation
- SQLite Documentation
- better-sqlite3 Documentation
- Swagger UI Documentation
- DB Browser for SQLite
- HTTP Status Codes Reference

---

# 👩‍💻 Author

**Jana Abdelwahab Hassan**

GitHub: https://github.com/jjanahassan

---

Built as part of the **FlyRank Backend Development Internship** 🚀
