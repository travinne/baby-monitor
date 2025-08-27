// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import BabyProfile from "./components/BabyProfile";
import DiaperTracker from "./components/DiaperTracker";
import FeedTracker from "./components/FeedTracker";
import SleepTracker from "./components/SleepTracker";

function App() {
  return (
    <Router>
      <div className="app">
        

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/baby-profile" element={<BabyProfile />} />
          <Route path="/diaper-tracker" element={<DiaperTracker />} />
          <Route path="/feeding" element={<FeedTracker />} />
          <Route path="/sleep-tracker" element={<SleepTracker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
