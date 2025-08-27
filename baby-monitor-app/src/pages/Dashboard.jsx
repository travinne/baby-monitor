import React from "react";
import BabyProfile from "../components/BabyProfile";
import DiaperTracker from "../components/DiaperTracker";
import FeedTracker from "../components/FeedTracker";
import SleepTracker from "../components/SleepTracker";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Baby Monitor Dashboard</h1>

      <div className="dashboard-section">
        <BabyProfile />
      </div>
      <div className="dashboard-section">
        <DiaperTracker />
      </div>
      <div className="dashboard-section">
        <FeedTracker />
      </div>
      <div className="dashboard-section">
        <SleepTracker />
      </div>
    </div>
  );
}

export default Dashboard;
