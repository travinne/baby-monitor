import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";


function GrowthTracker() {
  const [entries, setEntries] = useState([]);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [lastEntry, setLastEntry] = useState(null);

  const [months, setMonths] = useState("");
  const [days, setDays] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleAddEntry = () => {
    if (!weight || !height) return;

    const now = new Date().toLocaleString();
    const newEntry = { weight, height, time: now };

    setEntries([newEntry, ...entries]);
    setLastEntry(now);

    setWeight("");
    setHeight("");
  };

  useEffect(() => {
    let countdown;
    if (isRunning && timeLeft > 0) {
      countdown = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      alert("📏 Time to check the baby’s growth again!");
      setIsRunning(false);
    }
    return () => clearInterval(countdown);
  }, [isRunning, timeLeft]);

  const handleStartTimer = () => {
    const m = parseInt(months) || 0;
    const d = parseInt(days) || 0;
    if (m === 0 && d === 0) return;

    const totalSeconds = m * 30 * 24 * 3600 + d * 24 * 3600;
    setTimeLeft(totalSeconds);
    setIsRunning(true);
  };

  const formatTime = (seconds) => {
    const totalDays = Math.floor(seconds / (24 * 3600));
    const months = Math.floor(totalDays / 30);
    const days = totalDays % 30;
    const h = Math.floor((seconds % (24 * 3600)) / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${months}m ${days}d ${h}h ${min}m ${s < 10 ? "0" : ""}${s}s`;
  };

  return (
    <div className="container">
       <BackButton />
      <h2 className="title"> Growth Tracker</h2>

      {lastEntry ? (
        <p className="last-change">
          Last entry: <strong>{lastEntry}</strong>
        </p>
      ) : (
        <p className="last-change">No growth records logged yet</p>
      )}

      <div className="input-group">
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="select"
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="select"
        />
      </div>

      <button onClick={handleAddEntry} className="btn">
        Add Entry
      </button>

      <h3 className="history-title"> Growth History</h3>
      {entries.length === 0 ? (
        <p className="empty">No growth records yet</p>
      ) : (
        <ul className="log-list">
          {entries.map((entry, index) => (
            <li key={index} className="log-item">
              <div>
                <span className="log-mess">
                  {entry.weight} kg | {entry.height} cm
                </span>
              </div>
              <div className="time">{entry.time}</div>
            </li>
          ))}
        </ul>
      )}

      <h3 className="history-title"> Set Growth Check Reminder</h3>
      <div className="timer">
        <input
          type="number"
          min="0"
          placeholder="Months"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          className="select"
        />
        <input
          type="number"
          min="0"
          placeholder="Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="select"
        />
        <button onClick={handleStartTimer} className="btn">
          Start Reminder
        </button>
      </div>

      {isRunning && timeLeft !== null && (
        <p className="countdown">Time left: {formatTime(timeLeft)}</p>
      )}
    </div>
  );
}

export default GrowthTracker;
