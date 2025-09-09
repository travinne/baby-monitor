import React from "react";
import DiaperTracker from "../components/DiaperTracker";
import FeedTracker from "../components/FeedTracker";
import SleepTracker from "../components/SleepTracker";
import GrowthTracker from "../components/GrowthChart";
import CheckupsTracker from "../components/CheckUps";
import BathTimeTracker from "../components/BathTime";

function BabyDashboard() {
  return (
    <div className="dashboard">
      <h1>Baby Monitor Dashboard</h1>

      <div className="dashboard-section">
        <DiaperTracker />
      </div>

      <div className="dashboard-section">
        <FeedTracker />
      </div>

      <div className="dashboard-section">
        <SleepTracker />
      </div>

      <div className="dashboard-section">
        <GrowthTracker />
      </div>

      <div className="dashboard-section">
        <CheckupsTracker />
      </div>

      <div className="dashboard-section">
        <BathTimeTracker />
      </div>
    </div>
  );
}

export default BabyDashboard;
