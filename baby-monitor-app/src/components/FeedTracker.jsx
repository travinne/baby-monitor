import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";


function FeedingTracker() {
  const [entries, setEntries] = useState([]);
  const [feedType, setFeedType] = useState("");
  const [lastFeed, setLastFeed] = useState(null);

  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleAddEntry = () => {
    if (!feedType) return;

    const now = new Date().toLocaleString();
    const newEntry = { feedType, time: now };

    setEntries([newEntry, ...entries]);
    setLastFeed(now);

    setFeedType("");
  };

  useEffect(() => {
    let countdown;
    if (isRunning && timeLeft > 0) {
      countdown = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      alert("Time to feed the baby!");
      setIsRunning(false);
    }
    return () => clearInterval(countdown);
  }, [isRunning, timeLeft]);

  const handleStartTimer = () => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    if (h === 0 && m === 0) return;

    const totalSeconds = h * 3600 + m * 60;
    setTimeLeft(totalSeconds);
    setIsRunning(true);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s < 10 ? "0" : ""}${s}s`;
  };

  return (
    <div className="container">
       <BackButton />
      <h2 className="title"> Feeding Tracker</h2>

      {lastFeed ? (
        <p className="last-feed">
          Last feed: <strong>{lastFeed}</strong>
        </p>
      ) : (
        <p className="last-feed">No feedings logged yet</p>
      )}

      <select
        value={feedType}
        onChange={(e) => setFeedType(e.target.value)}
        className="select"
      >
        <option value="">Select Feed Type</option>
        <option value="Breast Milk">Breast Milk </option>
        <option value="Formula">Formula </option>
        <option value="Solid Food">Solid Food </option>
        <option value="Snack">Snack </option>
      </select>

      <button onClick={handleAddEntry} className="btn">
        Add Feeding
      </button>

      <h3 className="history-title"> Feeding History</h3>
      {entries.length === 0 ? (
        <p className="empty">No history yet</p>
      ) : (
        <ul className="log-list">
          {entries.map((entry, index) => (
            <li key={index} className="log-item">
              <div>
                <span className="log-feed">{entry.feedType}</span>
              </div>
              <div className="time">{entry.time}</div>
            </li>
          ))}
        </ul>
      )}

      <h3 className="history-title"> Set Feeding Timer</h3>
      <div className="timer">
        <input
          type="number"
          min="0"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="select"
        />
        <input
          type="number"
          min="0"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          className="select"
        />
        <button onClick={handleStartTimer} className="btn">
          Start Timer
        </button>
      </div>

      {isRunning && timeLeft !== null && (
        <p className="countdown">Time left: {formatTime(timeLeft)}</p>
      )}
    </div>
  );
}

export default FeedingTracker;
