import React, { useState } from "react";

export async function login({ email, password }) {
  return await fetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);

  const onSubmit = async (event) => {
    event.preventDefault();
    setHasError(false);
    const loginResult = await login({ email, password });
    if (!loginResult) setHasError(true);
    else {
      const { token } = loginResult;
      // Store token in local storage
      localStorage.setItem("token", token);
      window.location.href = "/home"; // Redirect to home after successful login
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={onEmailChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={onPasswordChange}
            required
          />
        </div>
        {hasError && (
          <div>
            Login failed. Please try again.
          </div>
        )}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
