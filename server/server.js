const express = require('express');
const app = express();

const todos = require('./routes/todos.router.js');

let PORT = process.env.PORT || 5001;

app.use(express.static('./server/public'));
app.use(express.json());

const todoList=[{
  text: "todo",
  isComplete: Boolean,
}]

app.use('/todos', todos);
app.get('/todos', (req, res) => {
  console.log(`In /todos server GET`);
  res.send(todoList);
});
app.post('/todos', (req, res) => {
  console.log(`In /todos POST in server`, req.body);
  koalasList.push(req.body);
  res.sendStatus(201);
});

// Do not modify this!
if (process.env.NODE_ENV == 'test') {
  PORT = 5002;
}

app.use(express.static('./server/public'));
app.use(express.json());

app.use('/todos', todos);

app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});
