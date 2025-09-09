import React, { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    password: "",
    notifications: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings updated successfully!");
    console.log("Updated settings:", settings);
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      alert("Account deleted!");
      console.log("Account deletion process started...");
    }
  };

  const handleLogout = () => {
    alert("You have been logged out!");
    console.log("User logged out");
  };

  return (
    <div className="settings">
      <h2 className="settings-title">Account Settings</h2>
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-section">
          <h3>Profile</h3>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={settings.fullName}
            onChange={handleChange}
            className="settings-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={settings.email}
            onChange={handleChange}
            className="settings-input"
          />
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={settings.password}
            onChange={handleChange}
            className="settings-input"
          />
        </div>

        <div className="settings-section">
          <h3>Preferences</h3>
          <label className="settings-label">
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
            />
            Enable Notifications
          </label>

          <label className="settings-label">
            <input
              type="checkbox"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleChange}
            />
            Dark Mode
          </label>
        </div>

        <button type="submit" className="settings-btn">
          Save Changes
        </button>
      </form>

      <div className="settings-section danger-zone">
        <h3>Danger Zone</h3>
        <button
          type="button"
          className="delete-btn"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>

      <div className="settings-section logout-zone">
        <button
          type="button"
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Settings;
