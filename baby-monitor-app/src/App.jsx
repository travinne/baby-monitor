import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BabyProfile from "./pages/BabyProfile";
import Settings from "./pages/Settings";

import FeedTracker from "./components/FeedTracker";
import SleepTracker from "./components/SleepTracker";
import DiaperTracker from "./components/DiaperTracker";
import GrowthChart from "./components/GrowthChart";
import CheckUps from "./components/CheckUps";
import Allergies from "./components/Allergies";
import BathTimeTracker from "./components/BathTime";

import Navbar from "./components/NavBar";

function AppWrapper() {
  const location = useLocation();
  const hiddenNavbarRoutes = ["/login", "/register"];
  const hideNavbar = hiddenNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className="app">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/baby-profile" element={<BabyProfile />} />
          <Route path="/settings" element={<Settings />} />

          {/* Tracker Components */}
          <Route path="/feed-tracker" element={<FeedTracker />} />
          <Route path="/sleep-tracker" element={<SleepTracker />} />
          <Route path="/diaper-tracker" element={<DiaperTracker />} />
          <Route path="/growth-tracker" element={<GrowthChart />} />
          <Route path="/checkups" element={<CheckUps />} />
          <Route path="/allergies" element={<Allergies />} />
          <Route path="/bath-time" element={<BathTimeTracker />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
