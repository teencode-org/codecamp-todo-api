// declare controllers
import pool from "../model/db";

class TodoController {
  // GET /todos - get all of the todos we have in the system
  static async getAllTodos(req, res) {
    try {
      const query = "SELECT * FROM todos";
      const todos = await pool.query(query);
      if (!todos.rows.length) return res.status(404).json("No todos");
      return res.json({
        todos: todos.rows
      });
    } catch (e) {
      console.log(e);
    }
  }

  // GET /todos/:id
  static async getTodoById(req, res) {
    //const id = parseInt(req.params.id, 10);
    const id = Number(req.params.id);
    const query = "SELECT * FROM todos WHERE id=$1";
    const value = [id];
    const todo = await pool.query(query, value);
    if (!todo.rows.length)
      return res.status(404).json("No todo associated with this ID");

    return res.json({ todo: todo.rows[0] });
  }

  // POST /todos - post a new todo
  static async createTodo(req, res) {
    const name = req.body.name;

    if (!name) {
      return res.status(400).json({
        message: "Todo name is required"
      });
    }
    try {
      const query =
        "INSERT INTO todos (name, created_at, completed) VALUES($1,NOW(),$2) RETURNING *";
      const value = [name, false];
      const newTodo = await pool.query(query, value);
      return res.json({ todo: newTodo.rows });
    } catch (e) {}
  }

  // PUT /todos/:id
  static async updateTodo(req, res) {
    const id = req.params.id;
    try {
      const queryText = "SELECT * FROM todos WHERE id=$1";
      const value = [id];
      const todo = await pool.query(queryText, value);
      if (!todo.rows.length)
        return res.status(404).json("No todo associated with this ID");
      const result = todo.rows[0];
      console.log("result ", result);
      const name = req.body.name || result.name;
      const completed = req.body.completed || result.completed;
      const query =
        "UPDATE todos SET name=$1,completed=$2,created_at=NOW() WHERE id=$3 RETURNING *";
      const values = [name, completed, id];
      const updatedTodo = await pool.query(query, values);
      return res.json({
        message: "Todo updated successfully",
        todo: updatedTodo.rows
      });
    } catch (e) {
      return res.status(400).send({
        message: `Cannot update todo with id ${id} because it doesn't exist on our server.`
      });
    }
  }

  // DELETE /todos/:id
  static async deleteTodo(req, res) {
    const id = req.params.id;
    try {
      const query = "DELETE FROM todos WHERE id=$1";
      const value = [id];
      const todo = await pool.query(query, value);
      if (!todo.rowCount)
        return res.status(404).json("No todo associated with this ID");
      return res.json({
        message: "Todo deleted successfully"
      });
    } catch (e) {}
  }
}

// module.exports= TodoController;
export default TodoController;
