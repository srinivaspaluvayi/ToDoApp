import React from "react";
import Navbar from "../../components/Navbar";
import TaskManager from "../TasksFiles/TaskManager";
const AfterLoggedIn = () => {
  return (
    <div>
      <Navbar />
      <TaskManager />
    </div>
  );
};

export default AfterLoggedIn;
