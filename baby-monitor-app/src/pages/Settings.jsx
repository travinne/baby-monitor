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
    localStorage.setItem("userSettings", JSON.stringify(settings));
  }, [settings]);

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

    alert("Settings updated successfully!");
    console.log("Updated settings:", settings);
    setIsModified(false);
    
    // Clear password fields after successful save
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
      alert("Account deletion process started...");
      console.log("Account deletion confirmed");
    } else if (confirmation !== null) {
      alert("Invalid confirmation. Account was not deleted.");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      alert("You have been logged out!");
      console.log("User logged out");
    }
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <h2>Account Settings</h2>
        {isModified && <span>Unsaved changes</span>}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="settings-section">
          <h3>Profile</h3>
          
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={settings.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="oldPassword">Current Password</label>
            <input
              id="oldPassword"
              type="password"
              name="oldPassword"
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
              placeholder="Enter new password"
              value={settings.newPassword}
              onChange={handleChange}
            />
            {errors.newPassword && <span>{errors.newPassword}</span>}
          </div>
        </div>

        <div className="settings-section">
          <h3>Preferences</h3>
          
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
              />
              Enable Notifications
            </label>
          </div>

          <div className="form-group">
            <label>Theme</label>
            <div>
              <button
                type="button"
                onClick={() => handleThemeChange("light")}
              >
                Light Mode
              </button>
              <button
                type="button"
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
            disabled={!isModified || Object.keys(errors).length > 0}
          >
            Save Changes
          </button>
          
          <button 
            type="button" 
            onClick={handleReset}
            disabled={!isModified}
          >
            Reset
          </button>
        </div>
      </form>

      <div className="settings-section danger-zone">
        <h3>Danger Zone</h3>
        <p>These actions are irreversible. Please proceed with caution.</p>
        <button type="button" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>

      <div className="settings-section">
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Settings;