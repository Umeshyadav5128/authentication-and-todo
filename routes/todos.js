const express = require('express');
const auth = require('../middleware/auth');
const { getTodos, saveTodos } = require('../data/store');

const router = express.Router();
router.use(auth);

router.get('/', (req, res) => {
  const todos = getTodos().filter((todo) => todo.userId === req.user.userId);
  res.json(todos);
});

router.post('/', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const todos = getTodos();
  const newTodo = {
    id: Date.now().toString(),
    userId: req.user.userId,
    title,
    description: description || '',
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(newTodo);
  saveTodos(todos);

  res.status(201).json(newTodo);
});

router.get('/:id', (req, res) => {
  const todos = getTodos();
  const todo = todos.find((item) => item.id === req.params.id && item.userId === req.user.userId);
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  res.json(todo);
});

router.put('/:id', (req, res) => {
  const { title, description, completed } = req.body;
  const todos = getTodos();
  const todoIndex = todos.findIndex((item) => item.id === req.params.id && item.userId === req.user.userId);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const todo = todos[todoIndex];
  todos[todoIndex] = {
    ...todo,
    title: title ?? todo.title,
    description: description ?? todo.description,
    completed: completed === undefined ? todo.completed : Boolean(completed),
    updatedAt: new Date().toISOString(),
  };

  saveTodos(todos);
  res.json(todos[todoIndex]);
});

router.delete('/:id', (req, res) => {
  const todos = getTodos();
  const todoIndex = todos.findIndex((item) => item.id === req.params.id && item.userId === req.user.userId);
  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos.splice(todoIndex, 1);
  saveTodos(todos);

  res.json({ message: 'Todo deleted successfully' });
});

module.exports = router;
