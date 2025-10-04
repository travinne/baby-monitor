import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "username":
        if (value.trim().length === 0) {
          newErrors.username = "Username is required";
        } else {
          delete newErrors.username;
        }
        break;
      case "password":
        if (value.length === 0) {
          newErrors.password = "Password is required";
        } else if (value.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        } else {
          delete newErrors.password;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue,
    });

    if (type !== "checkbox") {
      validateField(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    validateField("username", formData.username);
    validateField("password", formData.password);

    if (!formData.username || !formData.password) {
      setIsSubmitting(false);
      alert("Please enter both username and password!");
      return;
    }

    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      alert("Please fix all errors before logging in");
      return;
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.username === formData.username) {
        if (formData.rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }
        
        setTimeout(() => {
          setIsSubmitting(false);
          alert("Login successful! Welcome back!");
          navigate("/dashboard");
        }, 1000);
        return;
      }
    }

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Login successful! Welcome!");
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="login">
      <h2 className="login-title">Welcome Back</h2>
      <p className="auth-subtitle">Sign in to continue tracking your baby's journey</p>
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            className="input"
            required
          />
          {errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            required
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="rememberMe"
              className="checkbox-input"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <span className="checkbox-text">
              Remember me
            </span>
          </label>
        </div>

        <button 
          type="submit" 
          className="btn login-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="register-link">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="link-btn"
        >
          Register here
        </button>
      </p>

      <p className="forgot-password">
        <button 
          type="button"
          onClick={() => alert("Password reset feature coming soon!")}
          className="link-btn"
        >
          Forgot password?
        </button>
      </p>
    </div>
  );
}

export default Login;