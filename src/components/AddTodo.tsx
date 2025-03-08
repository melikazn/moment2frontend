import React, { useState } from 'react';

// Definierar typ för props som skickas till komponenten
interface AddTodoProps {
  addTodo: (title: string, description: string, status: string) => void; // Funktion för att lägga till en todo
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
  // State för att lagra titel, beskrivning, status, och felmeddelanden
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('not_started'); // Standardstatus är 'not_started'
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Funktion som körs när formuläret skickas
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validering av titel och beskrivning
    if (title.length < 3) {
      setError('Titeln måste vara minst 3 tecken lång!');
      return;
    }
    if (description.length > 200) {
      setError('Beskrivningen får inte överstiga 200 tecken!');
      return;
    }

    // Om ingen valideringsfel, lägg till todo och nollställ fälten
    setError('');
    addTodo(title, description, status);
    setTitle('');
    setDescription('');
    setSuccessMessage('Uppgiften har lagts till!');
    setTimeout(() => setSuccessMessage(''), 3000); // Döljer framgångsmeddelandet efter 3 sekunder
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Titel:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>
      <div>
        <label>Beskrivning:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="not_started">Ej-påbörjad</option>
          <option value="in_progress">Pågående</option>
          <option value="completed">Avklarad</option>
        </select>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Visar felmeddelande om det finns */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Visar framgångsmeddelande */}
      <button type="submit">Lägg till</button>
    </form>
  );
};

export default AddTodo;
