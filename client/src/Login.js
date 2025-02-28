import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

export async function login({ email, password }) {
  return await fetch("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      // If request is not successful, display error message
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

function Login({ onLoginSuccessful }) {
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
      const { email, token } = loginResult;
      // Save user IDs on local storage
      localStorage.setItem("email", email);
      localStorage.setItem("token", token);
      // console.log(localStorage.getItem("email"));
      console.log(localStorage.getItem("token"));
      onLoginSuccessful();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form className="w-full" onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter email"
              onChange={onEmailChange}
              value={email}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <p className="text-sm text-gray-500">
              We'll never share your email with anyone else.
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              onChange={onPasswordChange}
              value={password}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          {hasError && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
              The email address and password you entered don't match any
              account. Please try again.
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
