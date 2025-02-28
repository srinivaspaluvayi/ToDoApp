import React, { useState, useEffect } from "react";

function Home({ onAddTaskClick, onLogout }) {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    console.log("hello ");
    setUserEmail(email || "User");
  }, []);
  const getUsernameFromEmail = (userEmail) => {
    return userEmail.split("@")[0];
  };
  const userName = getUsernameFromEmail(userEmail);
  return (
    <nav className="navbar">
      <h1>Hello {userName}</h1>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={onLogout}
      >
        Logout
      </button>
    </nav>
  );
}

export default Home;
