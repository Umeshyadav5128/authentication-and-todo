const fs = require('fs');
const path = require('path');

const dbFile = path.join(__dirname, 'db.json');

function ensureDb() {
  if (!fs.existsSync(dbFile)) {
    fs.mkdirSync(path.dirname(dbFile), { recursive: true });
    fs.writeFileSync(dbFile, JSON.stringify({ users: [], todos: [] }, null, 2));
  }
}

function readData() {
  ensureDb();
  const raw = fs.readFileSync(dbFile, 'utf-8');
  return JSON.parse(raw);
}

function writeData(data) {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
}

function getUsers() {
  return readData().users;
}

function getTodos() {
  return readData().todos;
}

function saveUsers(users) {
  const data = readData();
  data.users = users;
  writeData(data);
}

function saveTodos(todos) {
  const data = readData();
  data.todos = todos;
  writeData(data);
}

module.exports = {
  getUsers,
  getTodos,
  saveUsers,
  saveTodos,
};
