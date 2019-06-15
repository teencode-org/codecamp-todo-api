// import express
const express = require('express');

// import bodyParser
const bodyParser = require('body-parser');

// import dotenv for environment variables management
const dotenv = require('dotenv');

// import uuid
const uuidv1 = require('uuid/v1');

// instantiate dotenv
dotenv.config();

// initialize express
const app = express();

// configure body-parser for express
app.use(bodyParser.json({ extended: true }));

const PORT = process.env.PORT || 4000;

// TODO object: name, completed, created_at

let todos = [
  {
    id: uuidv1(),
    name: 'Play FIFA',
    created_at: new Date(),
    completed: false
  },
  {
    id: uuidv1(),
    name: 'Clean my room',
    created_at: new Date(),
    completed: false
  },
  {
    id: uuidv1(),
    name: 'Eat beans',
    created_at: new Date(),
    completed: true
  }
];

// declare routes

// req - request
// res - response
app.get('/', (req, res) => {
  return res.json({ message: 'Welcome to our todos API' });
});

// GET /todos - get all of the todos we have in the system
app.get('/todos', (req, res) => {
  return res.json({
    count: todos.length,
    todos
  });
});

// GET parameters from the query
// app.get('/todos/id', (req, res) => {
//   const x = req.query.x;
//   const y = req.query.y;
//   const cost = req.query.cost;
//   res.json({
//     x,
//     y,
//     cost
//   });
// });

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find(each => each.id === id);
  if (!todo) {
    return res.status(404).json({
      message: `Todo with id ${id} cannot be found`
    });
  }
  return res.json({ todo });
});

// POST /todos - post a new todo
app.post('/todos', (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).json({
      message: 'Todo name is required'
    });
  }

  // generate an id.
  const id = uuidv1();

  // declare a new todo object
  const newTodo = {
    id: id,
    name: name,
    created_at: new Date(),
    completed: false
  };

  // append it to the todos array
  todos.push(newTodo);

  return res.json({ todo: newTodo });
});

// PUT /todos/:id
app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const completed = req.body.completed;
  const todoToUpdate = todos.find(todo => todo.id === id);
  if (todoToUpdate) {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          id: todo.id,
          name: name || todo.name,
          created_at: todo.created_at,
          // fix this to save completed status if user pass in "false"
          completed: completed || todo.completed
        };
      }
      return todo;
    });

    todos = newTodos;

    return res.json({
      message: 'Todo updated successfully'
    });
  }
  return res.status(400).send({
    message: `Cannot update todo with id ${id} because it doesn't exist on our server.`
  });
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  const newTodos = todos.filter(todo => todo.id !== id);

  todos = newTodos;

  return res.json({
    message: 'Todo deleted successfully'
  });
});

app.use('*', (req, res) => {
  return res.send('Route not found');
});

// start the express server
app.listen(PORT, () => {
  console.log(`App started on http://localhost:${PORT}`);
});
