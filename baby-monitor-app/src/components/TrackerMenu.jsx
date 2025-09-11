import React from "react";
import { Link } from "react-router-dom";
import { FaBaby, FaMoon, FaUtensils, FaToilet, FaChartLine, FaSyringe, FaHeartbeat, FaBath } from "react-icons/fa";

function TrackerMenu() {
  return (
    <div
      className="tracker-menu"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1.5rem",
        textAlign: "center",
        marginTop: "2rem",
      }}
    >
      
      <Link to="/feed-tracker">
        <FaUtensils size={40} />
        <p>Feeding</p>
      </Link>

      <Link to="/sleep-tracker">
        <FaMoon size={40} />
        <p>Sleep</p>
      </Link>

      <Link to="/diaper-tracker">
        <FaToilet size={40} />
        <p>Diapers</p>
      </Link>

      <Link to="/growth-chart">
        <FaChartLine size={40} />
        <p>Growth</p>
      </Link>

      <Link to="/checkups">
        <FaSyringe size={40} />
        <p>Checkups</p>
      </Link>

      <Link to="/allergies">
        <FaHeartbeat size={40} />
        <p>Allergies</p>
      </Link>

      <Link to="/bath-time">
        <FaBath size={40} />
        <p>Bath Time</p>
      </Link>
    </div>
  );
}

export default TrackerMenu;
