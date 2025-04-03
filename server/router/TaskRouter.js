import express from "express";
// import Task from "../models/taskModel.js";
import userauth from "../middleware/usermiddleware.js";
import {
  getTask,
  addTask,
  deleteTask,
  updateTask,
} from "../controllers/taskControllers.js";
const TaskRouter = express.Router();

TaskRouter.get("/tasks", userauth, getTask); // Get all tasks
TaskRouter.post("/tasks", userauth, addTask); // Add a task
TaskRouter.put("/tasks/:id", userauth, updateTask); // ✅ Update task by ID
TaskRouter.delete("/tasks/:id", userauth, deleteTask); // ✅ Delete task by ID

export default TaskRouter;
