import React, { useEffect, useState } from "react";
import Login from "./Login";

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) setIsUserSignedIn(true);
    else setIsUserSignedIn(false);
  }, []);

  const onLoginSuccessful = () => {
    setIsUserSignedIn(true);
  };

  const onLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    setIsUserSignedIn(false);
  };

  return (
    <div className="App">
      {isUserSignedIn ? (
        <div>
          <h1>Welcome, {localStorage.getItem("name") || "User"}!</h1>
          <button onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <Login onLoginSuccessful={onLoginSuccessful} />
      )}
    </div>
  );
}

export default App;
