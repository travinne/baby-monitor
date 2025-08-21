import React, { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    fullName: "",
    email: "",
    password: "",
    notifications: true,
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

  return (
    <div className="settings">
      <h2 className="settings-title">Settings</h2>
      <form onSubmit={handleSubmit} className="settings-form">

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

        <label className="settings-label">
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
          />
          Enable Notifications
        </label>

        <button type="submit" className="settings-btn">
          Save Settings
        </button>
      </form>
    </div>
  );
}

export default Settings;
