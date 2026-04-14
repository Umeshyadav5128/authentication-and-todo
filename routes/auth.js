const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUsers, saveUsers } = require('../data/store');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Use POST /auth/register to create a user or POST /auth/login to receive a token.'
  });
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }

  const users = getUsers();
  const existingUser = users.find((user) => user.email === email.toLowerCase());
  if (existingUser) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
  };

  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const users = getUsers();
  const user = users.find((item) => item.email === email.toLowerCase());
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { userId: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET || 'secret-key',
    { expiresIn: '8h' }
  );

  res.json({ token });
});

module.exports = router;
