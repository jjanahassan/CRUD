const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const tasks = [
    {id: 1, title: "Finish stage 2", done: false},
    {id: 2, title: "Run my program", done: true},
    {id: 3, title: "Push project to GitHub", done: true}
];

app.get('/hello', (req, res) => {
    res.send('hello server');
});

app.get('/', (req, res) => {
    res.json({
        name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: "ok"
    });
});

app.get('/tasks', (req, res) => {
    console.log('Tasks route matched!');
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(task => task.id === id);
    
    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }
    
    res.json(task);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});