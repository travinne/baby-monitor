import React, { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
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

    if (!formData.email || !formData.password) {
      alert("Please enter both email and password!");
      return;
    }

    alert("Login successful!");
    console.log("Logged in with:", formData);
  };

  return (
    <div className="login">
      <h2 className="login-title">Parent Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
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
    </div>
  );
}

export default Login;
