// declare controllers
const uuidv1 = require('uuid/v1');
let todos = require('../dummyData/dummy')

class TodoController {
  // GET /todos - get all of the todos we have in the system
  static getAllTodos(req, res) {
    return res.json({
      count: todos.length,
      todos
    });
  }

  // GET /todos/:id
  static getTodoById(req, res) {
    const id = parseInt(req.params.id, 10);
    const todo = todos.find(each => each.id === id);
    if (!todo) {
      return res.status(404).json({
        message: `Todo with id ${id} cannot be found`
      });
    }
    return res.json({
      todo
    });
  }

  // POST /todos - post a new todo
  static createTodo(req, res) {
    const name = req.body.name;
    console.log(name);
    if (!name) {
      return res.status(400).json({
        message: "Todo name is required"
      });
    };
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

    return res.json({
      todo: newTodo
    });
  }



  // Issue 
  // Issue 

  // PUT /todos/:id
  static updateTodo(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const completed = req.body.completed;
    const todoToUpdate = todos.find(todo => todo.id == id);
    if (!name) {
      return res.status(400).json({
        message: "Todo name is required"
      });
    }
    else if (todoToUpdate) {
      const newTodos = todos.map(each => {
        if (each.id == id) {
          return {
            id: each.id,
            name: name,
            created_at: each.created_at,
            // fix this to save completed status if user pass in "false"
            completed: completed || each.completed

          };
        }
        return each;
      });

      todos = newTodos;
      return res.json({
        message: "Todo updated successfully",
        data: newTodos
      });
    }
    return res.status(400).send({
      message: `Cannot update todo with id ${id} because it doesn't exist on our server.`
    });
  }
  // Issue

  // DELETE /todos/:id
  static deleteTodo(req, res) {
    const id = req.params.id;

    const newTodos = todos.filter(todo => todo.id !== id);

    todos = newTodos;

    return res.json({
      message: "Todo deleted successfully"
    });
  }
}

module.exports = TodoController;