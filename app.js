const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('dist'));

const PORT = process.env.PORT || 3001;

let todos = [
  {id: 1, content: 'Learn CI/CD'},
  {id: 2, content: 'Build a pipeline'},
];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const todo = {
    id: todos.length + 1,
    content: req.body.content,
  };
  todos = todos.concat(todo);
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter((t) => t.id !== Number(req.params.id));
  res.status(204).end();
});

app.get('/health', (req, res) => {
  res.send('ok');
});

app.get('/version', (req, res) => {
  res.send('1');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
}

module.exports = app;
