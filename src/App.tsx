import { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './App.css';

// Definiera en striktare typ för Todo
interface Todo {
  id: number;
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed'; // Striktare status-typ
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);  // Typa todos med Todo
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Hämta todos från backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5100/todos');
      setTodos(response.data);
      setLoading(false);
    } catch (err: unknown) {
      setError('Error fetching todos');
      setLoading(false);
      console.error(err);  // Logga felet för felsökning
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Funktion för att lägga till en todo
  const addTodo = async (title: string, description: string) => {
    try {
      const response = await axios.post('http://localhost:5100/todos', {
        title,
        description,
        status: 'not_started', // Default status
      });
      setTodos([...todos, { title, description, status: 'not_started', id: response.data.id }]);
    } catch (err: unknown) {
      setError('Failed to add todo');
      console.error(err);  // Logga felet för felsökning
    }
  };

  // Funktion för att uppdatera status
  const updateTodoStatus = async (id: number, status: 'not_started' | 'in_progress' | 'completed') => {
    try {
      await axios.put(`http://localhost:5100/todos/${id}`, { status });
      setTodos(todos.map(todo => (todo.id === id ? { ...todo, status } : todo)));
    } catch (err: unknown) {
      setError('Failed to update todo status');
      console.error(err);  // Logga felet för felsökning
    }
  };

  // Funktion för att ta bort en todo
  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5100/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err: unknown) {
      setError('Failed to delete todo');
      console.error(err);  // Logga felet för felsökning
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} updateTodoStatus={updateTodoStatus} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
