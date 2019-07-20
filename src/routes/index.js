// declare routes
import Router from"express";
import TodoController from "../controllers";

// initialize Router
const appRouter = Router();

// req - request
// res - response
appRouter.get("/", (req, res) => {
  return res.json({ message: "Welcome to our todos API" });
});

// GET /todos - get all of the todos we have in the system
appRouter.get("/todos", TodoController.getAllTodos);

// GET /todos/:id
appRouter.get("/todos/:id", TodoController.getTodoById);

// POST /todos - post a new todo
appRouter.post("/todos", TodoController.createTodo);

// PUT /todos/:id
appRouter.put("/todos/:id", TodoController.updateTodo);

// DELETE /todos/:id
appRouter.delete("/todos/:id", TodoController.deleteTodo);

appRouter.use("*", (req, res) => {
  return res.send("Route not found");
});

export default appRouter;
