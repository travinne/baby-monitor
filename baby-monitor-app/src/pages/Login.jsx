import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      alert("Please enter both username and password!");
      return;
    }

    alert("Login successful!");
    console.log("Logged in with:", formData);

    navigate("/dashboard");
  };

  return (
    <div className="login">
      <h2 className="login-title">Parent Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="login-input"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="login-input"
          required
        />

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>

      <p className="register-link">
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/register")}
          className="register-btn"
        >
          Register
        </button>
      </p>
    </div>
  );
}

export default Login;
