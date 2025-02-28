import React, { useState } from "react";
import Login from "./Login";
import Home from "./components/Home";

function App() {
  // Immediately check localStorage for a token when initializing state.
  const [isUserSignedIn, setIsUserSignedIn] = useState(
    !!localStorage.getItem("token")
  );

  const onLoginSuccessful = () => {
    setIsUserSignedIn(true);
  };

  const onLogout = () => {
    localStorage.clear();
    setIsUserSignedIn(false);
  };

  return (
    <div className="App">
      {isUserSignedIn ? (
        <Home onLogout={onLogout} />
      ) : (
        <Login onLoginSuccessful={onLoginSuccessful} />
      )}
    </div>
  );
}

export default App;
