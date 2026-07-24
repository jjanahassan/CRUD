# Task API

A simple RESTful CRUD API for managing tasks, built with **Express.js** and documented with **Swagger UI**.

## 📋 About

This is a lightweight Task Management API that demonstrates full CRUD (Create, Read, Update, Delete) operations. It's designed as a learning project to understand REST API development with Express.js, complete with interactive documentation.

**Features:**
- ✅ Full CRUD operations for tasks
- ✅ Interactive API documentation with Swagger UI
- ✅ Proper HTTP status codes
- ✅ JSON request/response format
- ✅ In-memory data storage (no database required)

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

### Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd <your-project-folder>
npm install
Running the Server
Start the server with:

bash
node server.js
The server will start on http://localhost:3000

You should see:

text
Server running on http://localhost:3000
Swagger UI available at http://localhost:3000/docs
Testing with Swagger UI
Open your browser and navigate to:

text
http://localhost:3000/docs
You'll see the interactive Swagger UI where you can test all endpoints with the "Try it out" button!

📚 API Endpoints
Method	Endpoint	Description
GET	/	API information and available endpoints
GET	/hello	Test endpoint - returns "hello server"
GET	/health	Health check - returns API status
GET	/tasks	Get all tasks
GET	/tasks/:id	Get a single task by ID
POST	/tasks	Create a new task
PUT	/tasks/:id	Update an existing task
DELETE	/tasks/:id	Delete a task
📦 Task Schema
A task object has the following structure:

json
{
  "id": 1,
  "title": "Finish stage 2",
  "done": false
}
Field	Type	Description
id	integer	Unique identifier (auto-generated)
title	string	Task description (required)
done	boolean	Task completion status
🔧 API Usage Examples
Create a Task (POST /tasks)
Request:

bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Swagger"}'
Response:

json
{
  "id": 4,
  "title": "Learn Swagger",
  "done": false
}
Status: 201 Created

Get All Tasks (GET /tasks)
Request:

bash
curl http://localhost:3000/tasks
Response:

json
[
  {
    "id": 1,
    "title": "Finish stage 2",
    "done": false
  },
  {
    "id": 2,
    "title": "Run my program",
    "done": true
  }
]
Status: 200 OK

Get a Single Task (GET /tasks/:id)
Request:

bash
curl http://localhost:3000/tasks/1
Response:

json
{
  "id": 1,
  "title": "Finish stage 2",
  "done": false
}
Status: 200 OK

Error Response (Task not found):

json
{
  "error": "Task 999 not found"
}
Status: 404 Not Found

Update a Task (PUT /tasks/:id)
Request:

bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Finish stage 2 updated", "done": true}'
Response:

json
{
  "id": 1,
  "title": "Finish stage 2 updated",
  "done": true
}
Status: 200 OK

Delete a Task (DELETE /tasks/:id)
Request:

bash
curl -X DELETE http://localhost:3000/tasks/4
Response: (Empty body)
Status: 204 No Content

🧪 Testing the Full CRUD Cycle
Here's a complete testing sequence using curl:

bash
# 1. Create a task
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries"}'

# 2. Get all tasks (verify it was added)
curl http://localhost:3000/tasks

# 3. Update the task
curl -X PUT http://localhost:3000/tasks/4 \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy organic groceries", "done": true}'

# 4. Get the specific task (verify update)
curl http://localhost:3000/tasks/4

# 5. Delete the task
curl -X DELETE http://localhost:3000/tasks/4

# 6. Confirm it's gone
curl http://localhost:3000/tasks
📸 Swagger UI Screenshot
<img width="1895" height="917" alt="image" src="https://github.com/user-attachments/assets/2da92404-cfa5-4720-84b3-bde132417d2f" />
<img width="1901" height="547" alt="image" src="https://github.com/user-attachments/assets/323a449e-fc5a-4ea8-903b-fab9b002aad4" />



Interactive API documentation at http://localhost:3000/docs

🛠️ Technology Stack
Node.js - JavaScript runtime

Express.js - Web framework

Swagger UI Express - API documentation

Swagger JSDoc - Generate OpenAPI specs from JSDoc comments

📁 Project Structure
text
CRUDAPI-node/
├── server.js           # Main application file
├── package.json        # Project dependencies
├── README.md           # Project documentation
└── swagger-screenshot.png  # Swagger UI screenshot
🔍 Status Codes
Status Code	Description
200 OK	Request succeeded
201 Created	Resource created successfully
204 No Content	Request succeeded (no response body)
400 Bad Request	Invalid input
404 Not Found	Resource not found
🚧 Next Steps
This is a foundational CRUD API. Future improvements could include:

□ Persistent database storage (PostgreSQL, MongoDB, etc.)
□ Filtering: GET /tasks?done=true
□ Search: GET /tasks?search=milk
□ Authentication & Authorization
□ Rate limiting
□ Environment variables for configuration
□ Unit tests
📖 Resources
Express.js Documentation

Swagger UI Documentation

OpenAPI Specification

HTTP Status Codes

👤 Author
Jana Abdelwahab Hassan - [GitHub: @jjanahassan] | [Email: janahassan210@yahoo.com]

Made with ❤️ as part of the Backend Development Learning Journey
