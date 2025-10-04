import React, { useEffect, useState } from "react";

function Settings() {
  const [settings, setSettings] = useState(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedSettings = localStorage.getItem("userSettings");
    
    if (savedSettings) {
      return { ...JSON.parse(savedSettings), theme: savedTheme };
    }
    
    return {
      fullName: "John Doe",
      email: "john@example.com",
      newPassword: "",
      oldPassword: "",
      notifications: true,
      theme: savedTheme
    };
  });

  const [errors, setErrors] = useState({});
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    document.body.className = settings.theme === "dark" ? "dark-theme" : "light-theme";
    localStorage.setItem("theme", settings.theme);
  }, [settings.theme]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "newPassword":
        if (value && value.length < 6) {
          newErrors.newPassword = "Password must be at least 6 characters";
        } else {
          delete newErrors.newPassword;
        }
        break;
      case "fullName":
        if (value && value.trim().length < 2) {
          newErrors.fullName = "Name must be at least 2 characters";
        } else {
          delete newErrors.fullName;
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
    
    setSettings(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    setIsModified(true);
    validateField(name, newValue);
  };

  const handleThemeChange = (mode) => {
    setSettings(prev => ({ ...prev, theme: mode }));
    setIsModified(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (Object.keys(errors).length > 0) {
      alert("Please fix errors before saving.");
      return;
    }

    if (settings.newPassword && !settings.oldPassword) {
      alert("Please enter your current password to set a new password.");
      return;
    }

    localStorage.setItem("userSettings", JSON.stringify(settings));
    alert("Settings updated successfully!");
    setIsModified(false);
    
    setSettings(prev => ({
      ...prev,
      newPassword: "",
      oldPassword: ""
    }));
  };

  const handleReset = () => {
    if (window.confirm("Reset all changes?")) {
      const savedSettings = localStorage.getItem("userSettings");
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
      setErrors({});
      setIsModified(false);
    }
  };

  const handleDeleteAccount = () => {
    const confirmation = window.prompt(
      "Type 'DELETE' to confirm account deletion. This action cannot be undone:"
    );
    
    if (confirmation === "DELETE") {
      localStorage.clear();
      alert("Account deleted successfully. Redirecting...");
      window.location.href = "/";
    } else if (confirmation !== null) {
      alert("Invalid confirmation. Account was not deleted.");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("userSettings");
      alert("You have been logged out!");
      window.location.href = "/login";
    }
  };

  return (
    <div className="container">
      <div className="settings-header">
        <h2 className="title">Account Settings</h2>
        {isModified && (
          <span className="unsaved-badge">
            Unsaved changes
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="settings-section">
          <h3>Profile Information</h3>
          
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              className="input"
              value={settings.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              className="input"
              value={settings.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="oldPassword">Current Password</label>
            <input
              id="oldPassword"
              type="password"
              name="oldPassword"
              className="input"
              placeholder="Enter current password to change it"
              value={settings.oldPassword}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              className="input"
              placeholder="Enter new password (min. 6 characters)"
              value={settings.newPassword}
              onChange={handleChange}
            />
            {errors.newPassword && (
              <span className="error-message">{errors.newPassword}</span>
            )}
          </div>
        </div>

        <div className="settings-section">
          <h3>Preferences</h3>
          
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="notifications"
                className="checkbox-input"
                checked={settings.notifications}
                onChange={handleChange}
              />
              <span className="checkbox-text">
                Enable Notifications
                <small>Receive updates about your baby's activities</small>
              </span>
            </label>
          </div>

          <div className="form-group">
            <label>Theme Preference</label>
            <div className="theme-toggle">
              <button
                type="button"
                className={`btn-theme ${settings.theme === "light" ? "activate-theme" : ""}`}
                onClick={() => handleThemeChange("light")}
              >
                Light Mode
              </button>
              <button
                type="button"
                className={`btn-theme ${settings.theme === "dark" ? "activate-theme" : ""}`}
                onClick={() => handleThemeChange("dark")}
              >
                Dark Mode
              </button>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn save-btn"
            disabled={!isModified || Object.keys(errors).length > 0}
          >
            Save Changes
          </button>
          
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={!isModified}
          >
            Reset Changes
          </button>
        </div>
      </form>

      <div className="settings-section danger-zone">
        <h3>Danger Zone</h3>
        <p className="danger-warning">
          These actions are irreversible. Please proceed with caution.
        </p>
        <button 
          type="button" 
          className="btn delete-btn"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>

      <div className="settings-section logout-section">
        <button 
          type="button" 
          className="btn remove-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Settings;