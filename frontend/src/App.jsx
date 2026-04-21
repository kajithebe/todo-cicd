import {useState, useEffect} from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    fetch('/api/todos', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({content: newTodo}),
    })
      .then((res) => res.json())
      .then((todo) => {
        setTodos(todos.concat(todo));
        setNewTodo('');
      });
  };

  const deleteTodo = (id) => {
    fetch(`/api/todos/${id}`, {method: 'DELETE'}).then(() =>
      setTodos(todos.filter((t) => t.id !== id))
    );
  };

  return (
    <div style={{maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial'}}>
      <h1>Todo App</h1>
      <div>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          style={{padding: '8px', width: '300px'}}
        />
        <button
          onClick={addTodo}
          style={{padding: '8px 16px', marginLeft: '8px'}}
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{marginTop: '8px'}}>
            {todo.content}
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{marginLeft: '8px'}}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
