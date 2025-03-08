import React from 'react';

// Definiera typ för Todo-objekt
interface Todos {
  id: number;
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed'; // Status kan vara en av dessa tre
}

// Definiera props som TodoList-komponenten tar emot
interface TodoListProps {
  todos: Todos[]; // Lista med todos
  updateTodoStatus: (id: number, status: 'not_started' | 'in_progress' | 'completed') => void; // Funktion för att uppdatera todo-status
  deleteTodo: (id: number) => void; // Funktion för att ta bort todo
}

const TodoList: React.FC<TodoListProps> = ({ todos, updateTodoStatus, deleteTodo }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} className="todo-item">
          <div>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
          </div>

          {/* Knappgrupp för att uppdatera status */}
          <div className="status-buttons">
            <button
              className={`status-btn ${todo.status === 'not_started' ? 'active' : ''}`}
              onClick={() => updateTodoStatus(todo.id, 'not_started')} // Uppdaterar status till 'Ej påbörjad'
            >
              Ej påbörjad
            </button>
            <button
              className={`status-btn ${todo.status === 'in_progress' ? 'active' : ''}`}
              onClick={() => updateTodoStatus(todo.id, 'in_progress')} // Uppdaterar status till 'Pågående'
            >
              Pågående
            </button>
            <button
              className={`status-btn ${todo.status === 'completed' ? 'active' : ''}`}
              onClick={() => updateTodoStatus(todo.id, 'completed')} // Uppdaterar status till 'Avklarad'
            >
              Avklarad
            </button>
          </div>

          {/* Knapp för att ta bort todo */}
          <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
            Ta bort
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
