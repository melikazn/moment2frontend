const connection = require('./db');

// Skapa en ny todo
const createTodo = (title, description, status, callback) => {
  const query = 'INSERT INTO todos (title, description, status) VALUES (?, ?, ?)';
  connection.query(query, [title, description, status], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

// Hämta alla todos
const getAllTodos = (callback) => {
  const query = 'SELECT * FROM todos';
  connection.query(query, (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};

// Uppdatera status för en todo
const updateTodoStatus = (id, status, callback) => {
  const query = 'UPDATE todos SET status = ? WHERE id = ?';
  connection.query(query, [status, id], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

// Ta bort en todo
const deleteTodo = (id, callback) => {
  const query = 'DELETE FROM todos WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

module.exports = { createTodo, getAllTodos, updateTodoStatus, deleteTodo };
