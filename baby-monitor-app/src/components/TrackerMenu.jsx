import React from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaUtensils, FaToilet, FaChartLine, FaSyringe, FaHeartbeat, FaBath } from "react-icons/fa";

function TrackerMenu() {
  const trackers = [
    { to: "/feed-tracker", icon: FaUtensils, label: "Feeding" },
    { to: "/sleep-tracker", icon: FaMoon, label: "Sleep" },
    { to: "/diaper-tracker", icon: FaToilet, label: "Diapers" },
    { to: "/growth-tracker", icon: FaChartLine, label: "Growth" },
    { to: "/checkups", icon: FaSyringe, label: "Checkups" },
    { to: "/allergies", icon: FaHeartbeat, label: "Allergies" },
    { to: "/bath-time", icon: FaBath, label: "Bath Time" },
  ];

  return (
    <div className="tracker-menu">
      {trackers.map(({ to, icon: Icon, label }) => (
        <Link key={to} to={to} className="tracker-card">
          <Icon size={40} />
          <p>{label}</p>
        </Link>
      ))}
    </div>
  );
}

export default TrackerMenu;