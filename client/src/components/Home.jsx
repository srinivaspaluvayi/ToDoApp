import React, { useState, useEffect } from "react";

function Home({ onAddTaskClick, onLogout }) {
  const [userEmail, setUserEmail] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask(""); // Clear input after adding
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };
  useEffect(() => {
    const email = localStorage.getItem("email");
    setUserEmail(email || "User");
  }, []);

  const getUsernameFromEmail = (userEmail) => {
    return userEmail.split("@")[0];
  };

  const userName = getUsernameFromEmail(userEmail);

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Todo</h1>
        <div className="text-xl font-bold">Hello {userName}</div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
      <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="border p-2 flex-grow rounded"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add
          </button>
        </div>
        <ul className="mt-4">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-2 mt-2 rounded"
            >
              {task}
              <button
                onClick={() => removeTask(index)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Home;
