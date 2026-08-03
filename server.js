const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const db= require("./db");

const app = express();
const port = 3000;

app.use(express.json());


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task API with Swagger",
            version: "1.0.0",
            description: "A simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Your Name",
                url: "https://yourwebsite.com",
                email: "your@email.com",
            },
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: "Development server",
            },
        ],
    },
    apis: ["./server.js"], 
};

const specs = swaggerJsdoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Test endpoint
 *     description: Returns a simple hello message
 *     responses:
 *       200:
 *         description: Hello message
 */

app.get('/hello', (req, res) => {
    res.send('hello server');
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: API information
 *     description: Returns API metadata and available endpoints
 *     responses:
 *       200:
 *         description: API information
 */

app.get('/', (req, res) => {
    res.json({
        name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     description: Returns the API status
 *     responses:
 *       200:
 *         description: API is healthy
 */

app.get('/health', (req, res) => {
    res.json({
        status: "ok"
    });
});

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieves a list of all tasks
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */

app.get('/tasks', (req, res) => {
    console.log('Tasks route matched!');
    const tasks = db.prepare('SELECT * FROM tasks ORDER BY id').all();
    res.json(tasks);
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a single task
 *     description: Retrieves a task by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The task ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */

app.get('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
    
    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }
    
    res.json(task);
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Adds a new task to the list
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: The task title
 *     responses:
 *       201:
  *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input
 */

app.post("/tasks", (req,res) => {
    const {title}=req.body;

    if(!title || title.trim() === ""){
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const insert= db.prepare(`insert into tasks (title, done) values(?, ?)`);
    const result= insert.run(title.trim(), 0);
    const newTask= db.prepare(`select * from tasks where id= ?`).get(result.lastInsertRowid);

    res.status(201).json(newTask);

});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Updates an existing task's title and/or done status
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The task ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The task title
 *               done:
 *                 type: boolean
 *                 description: Task completion status
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 */

app.put("/tasks/:id", (req,res) => {
    const id= Number(req.params.id);
    const task= tasks.find(task => task.id===id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    const {title, done}= req.body;
    if (!req.body || Object.keys(req.body).length===0){
        return res.status(400).json({
            error: "Request body cannot be empty"
        });
    }

    if (title.trim() === "") {
        return res.status(400).json({
                error: "Title cannot be empty"
            });
    }

    task.title= title.trim();

    if (done!== undefined){
        task.done=done;
    }

    res.json(task);
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Removes a task by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The task ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */

app.delete("/tasks/:id", (req,res) => {
    const id= Number(req.params.id);
    const taskIndex= tasks.findIndex(task => task.id ===id);
 
     if (taskIndex === -1) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send();

});

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The task ID (auto-generated by database)
 *         title:
 *           type: string
 *           description: The task title
 *         done:
 *           type: boolean
 *           description: Task completion status (0 = false, 1 = true)
 *       example:
 *         id: 1
 *         title: "Finish stage 2"
 *         done: false
 */

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Swagger UI available at http://localhost:${port}/docs`);
});