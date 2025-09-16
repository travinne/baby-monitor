import React, { useEffect, useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    newpassword: "",
    oldPassword:"",
    notifications: true,
    theme: 'light'
  });


  useEffect(() => {
    document.body.className = settings.theme === 'dark'?  "dark-theme" : "light-theme";
  }, [settings.theme]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleThemeChange = (mode) => {
    setSettings((prev) => ({ ...prev, theme: mode }));
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
          name= "oldpassword"
          placeholder="Old Password"
          value={settings.oldPassword}
          onChange={handleChange}
          className="settings input"
           />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={settings.newpassword}
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

         <div className="theme-toggle">
         <button
         type="button"
         onClick={() => handleThemeChange('light')}
         className={settings.theme === "light" ? "activate-theme" : ""}
         >
          light Mode
         </button>
         <button
         type="button"
         onClick={() => handleThemeChange('dark')}
         className={settings.theme === "dark" ? "activate-theme" : ""}
         >
          dark Mode
         </button>
         </div>
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
