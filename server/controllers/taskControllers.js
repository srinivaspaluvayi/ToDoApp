import TaskModel from "../models/taskModels.js";

export const getTask = async (req, res) => {
  const { userId } = req.body;
  try {
    const tasks = await TaskModel.find({ userId });
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ message: "Failed to get tasks" });
  }
};

export const addTask = async (req, res) => {
  const { text, userId, dueDate } = req.body;
  try {
    const task = new TaskModel({ text, userId, dueDate });
    await task.save();
    res.status(201).json({ success: true, task });
  } catch (err) {
    res.status(500).json({ message: "Failed to add task" });
  }
};

export const updateTask = async (req, res) => {
  const { text, completed, dueDate, userId } = req.body;
  try {
    const task = await TaskModel.findOneAndUpdate(
      { _id: req.params.id, userId },
      { text, completed, dueDate },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

export const deleteTask = async (req, res) => {
  const { userId } = req.body;
  try {
    const task = await TaskModel.findOneAndDelete({
      _id: req.params.id,
      userId,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};
