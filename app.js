require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Authentication and Todo Backend',
    routes: [
      'POST /auth/register',
      'POST /auth/login',
      'GET /todos',
      'POST /todos',
      'GET /todos/:id',
      'PUT /todos/:id',
      'DELETE /todos/:id'
    ]
  });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
