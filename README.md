# Task API

A simple RESTful CRUD API for managing tasks, built using **Node.js**, **Express.js**, and documented with **Swagger UI**.

## 📋 Overview

Task API is a lightweight backend application that demonstrates the implementation of a complete CRUD (Create, Read, Update, Delete) system using Express.js.

The project was created as a learning project to practice:
- Building RESTful APIs
- Handling HTTP methods and status codes
- Creating API documentation using Swagger
- Structuring backend applications with Express.js

## ✨ Features

- ✅ Complete CRUD operations for tasks
- ✅ RESTful API design
- ✅ Swagger UI interactive documentation
- ✅ JSON request and response handling
- ✅ Proper HTTP status codes
- ✅ In-memory data storage (no database required)

---

# 🚀 Getting Started

## Prerequisites

Make sure you have the following installed:

- Node.js (v14 or higher)
- npm (included with Node.js)

Check your versions:

```bash
node -v
npm -v
Installation

Clone the repository:

git clone https://github.com/jjanahassan/CRUD.git

Navigate to the project directory:

cd CRUDAPI-node

Install dependencies:

npm install
Running the Server

Start the application:

node server.js

The server will start at:

http://localhost:3000

You should see:

Server running on http://localhost:3000
Swagger UI available at http://localhost:3000/docs
📚 API Documentation

Swagger UI provides interactive API documentation where you can test all endpoints.

Open:

http://localhost:3000/docs

Click "Try it out" to send requests directly from your browser.

🔗 API Endpoints
Method	Endpoint	Description
GET	/	API information
GET	/hello	Test endpoint
GET	/health	Check API status
GET	/tasks	Retrieve all tasks
GET	/tasks/:id	Retrieve a task by ID
POST	/tasks	Create a new task
PUT	/tasks/:id	Update a task
DELETE	/tasks/:id	Delete a task
📦 Task Object Structure

Each task follows this format:

{
  "id": 1,
  "title": "Complete backend documentation",
  "done": false
}
Field	Type	Description
id	Integer	Automatically generated unique identifier
title	String	Task description (required)
done	Boolean	Completion status
🔧 API Examples
Create a Task
Request
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{"title":"Learn Swagger"}'
Response
{
  "id": 4,
  "title": "Learn Swagger",
  "done": false
}

Status Code: 201 Created

Get All Tasks
Request
curl http://localhost:3000/tasks
Response
[
  {
    "id": 1,
    "title": "Complete backend documentation",
    "done": false
  },
  {
    "id": 2,
    "title": "Test API endpoints",
    "done": true
  }
]

Status Code: 200 OK

Get Task By ID
Request
curl http://localhost:3000/tasks/1
Response
{
  "id":1,
  "title":"Complete backend documentation",
  "done":false
}

Status Code: 200 OK

If the task does not exist:

{
  "error":"Task 999 not found"
}

Status Code: 404 Not Found

Update a Task
Request
curl -X PUT http://localhost:3000/tasks/1 \
-H "Content-Type: application/json" \
-d '{"title":"Updated task","done":true}'
Response
{
  "id":1,
  "title":"Updated task",
  "done":true
}

Status Code: 200 OK

Delete a Task
Request
curl -X DELETE http://localhost:3000/tasks/1

Response:

No content

Status Code: 204 No Content

🧪 Testing CRUD Flow

Example workflow:

# Create a task
POST /tasks

# View all tasks
GET /tasks

# Update a task
PUT /tasks/:id

# Retrieve updated task
GET /tasks/:id

# Delete task
DELETE /tasks/:id
🛠️ Technology Stack
Technology	Purpose
Node.js	JavaScript runtime
Express.js	Backend web framework
Swagger UI Express	Interactive API documentation
Swagger JSDoc	OpenAPI specification generation
📁 Project Structure
CRUDAPI-node/
│
├── server.js              # Main Express application
├── package.json           # Project dependencies
├── package-lock.json      # Dependency versions
├── README.md              # Documentation
└── screenshots/           # Swagger screenshots
📊 HTTP Status Codes
Code	Meaning
200	Request successful
201	Resource created
204	Successful request with no response body
400	Invalid request
404	Resource not found
🚧 Future Improvements

Possible improvements:

☐ Add database integration (MongoDB/PostgreSQL)
☐ Add filtering and searching
☐ Add authentication and authorization
☐ Add environment variables
☐ Add unit and integration testing
☐ Add request validation
☐ Add API rate limiting
👩‍💻 Author

Jana Abdelwahab Hassan

GitHub: @jjanahassan

Built as part of a Backend Development Learning Journey 🚀
