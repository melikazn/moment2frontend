const express = require('express');
const bodyParser = require('body-parser');
const { createTodo, getAllTodos, updateTodoStatus, deleteTodo } = require('./todos');
const todos = require('./todos');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 5100;
// Aktivera CORS för alla domäner 
app.use(cors());
app.use(bodyParser.json()); // Middleware för att hantera JSON-data

app.get('/', (req, res) => {
  res.send('Hello, this is the backend!');
});
// Hämta alla todos
app.get('/todos', (req, res) => {
  getAllTodos((err, todos) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch todos' });
      return;
    }
    res.json(todos);
  });
});

// Skapa en ny todo
app.post('/todos', (req, res) => {
  const { title, description, status } = req.body;
  if (!title || title.length < 3) {
    return res.status(400).json({ error: 'Title must be at least 3 characters long' });
  }

  createTodo(title, description, status || 'not_started', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to create todo' });
      return;
    }
    res.status(201).json({ message: 'Todo created successfully', id: result.insertId });
  });
});

// Uppdatera en todos status
app.put('/todos/:id', (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!status || !['not_started', 'in_progress', 'completed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  updateTodoStatus(id, status, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update todo status' });
      return;
    }
    res.json({ message: 'Todo status updated successfully' });
  });
});

// Ta bort en todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  deleteTodo(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete todo' });
      return;
    }
    res.json({ message: 'Todo deleted successfully' });
  });
});
const fetchTodos = async () => {
  try {
      const response = await axios.get('http://localhost:5100/todos');
      setTodos(response.data);
  } catch (error) {
      console.error('Error fetching todos:', error);
  }
};

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
