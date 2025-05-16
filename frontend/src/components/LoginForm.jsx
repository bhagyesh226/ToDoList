// src/components/LoginForm.jsx
import React, { useState } from "react";

function LoginForm({ onLoginSuccess }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials
    if (userId === "6353447745" && password === "bhagyesh@12") {
      onLoginSuccess();
    } else {
      alert("Invalid ID or Password");
    }
  };

  return (
    <div className="card mt-4 mx-auto" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h5 className="card-title text-center">Login</h5>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
