import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="home-container">
      <header className="home-header">
        <h1> Welcome to Baby Monitor App</h1>
        <p className="home-subtitle">
          Your all-in-one tool to track your baby’s growth, feeding, sleeping, 
          checkups, and more — all in one place.
        </p>
      </header>

      <main className="home-main">
        <h2>Get Started</h2>
        <p>
          Head over to your Dashboard to start tracking and managing everything 
          about your baby in one simple view.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>
      </main>

      <footer className="home-footer">
        Baby Monitor App
      </footer>
    </div>
  );
}

export default Home;
