import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContent } from "../../context/AppContext";
import { toast } from "react-toastify";

const TaskManager = () => {
  const { backendUrl } = useContext(AppContent);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState(""); // new state for due date
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/task/tasks`, {
        withCredentials: true,
      });
      if (data.success) setTasks(data.tasks);
    } catch (error) {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    const dueDateObj = new Date(dueDate);
    try {
      const { data } = await axios.post(
        `${backendUrl}/task/tasks`,
        { text: newTask, dueDate: dueDateObj }, // send dueDate along with text
        { withCredentials: true }
      );
      setTasks((prev) => [...prev, data.task]);
      setNewTask("");
      setDueDate(""); // clear due date after adding
    } catch {
      toast.error("Could not add task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${backendUrl}/task/tasks/${id}`, {
        withCredentials: true,
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const handleUpdateTask = async (id) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/task/tasks/${id}`,
        { text: editingText },
        { withCredentials: true }
      );
      setTasks(tasks.map((task) => (task._id === id ? data.task : task)));
      setEditingTaskId(null);
    } catch {
      toast.error("Failed to update task");
    }
  };

  const toggleComplete = async (task) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/task/tasks/${task._id}`,
        { text: task.text, completed: !task.completed },
        { withCredentials: true }
      );
      setTasks(tasks.map((t) => (t._id === task._id ? data.task : t)));
    } catch {
      toast.error("Failed to toggle completion");
    }
  };

  // Helper: Check if a task is overdue
  const isOverdue = (task) => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate) < new Date() && !task.completed;
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Your Tasks
      </h2>
      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {/* New input for due date */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>
      {tasks?.length === 0 ? (
        <p className="text-center text-gray-500">
          No tasks yet. Add one to get started!
        </p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`flex items-center justify-between p-3 rounded-lg border 
                ${
                  task.completed
                    ? "bg-green-100 text-gray-500 line-through"
                    : "bg-gray-100 text-gray-800"
                }`}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                    className="h-5 w-5 text-blue-500"
                  />
                  {editingTaskId === task._id ? (
                    <input
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  ) : (
                    <span className="font-medium">{task.text}</span>
                  )}
                </div>
                {task.dueDate && (
                  <small
                    className={`mt-1 ${
                      isOverdue(task)
                        ? "text-red-600 font-bold"
                        : "text-gray-600"
                    }`}
                  >
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                    {isOverdue(task) && " (Overdue)"}
                  </small>
                )}
              </div>
              <div className="flex items-center gap-3">
                {editingTaskId === task._id ? (
                  <button
                    onClick={() => handleUpdateTask(task._id)}
                    className="text-green-600 hover:text-green-800 transition font-semibold"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingTaskId(task._id);
                      setEditingText(task.text);
                    }}
                    className="text-blue-600 hover:text-blue-800 transition font-semibold"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-red-600 hover:text-red-800 transition font-semibold"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskManager;
