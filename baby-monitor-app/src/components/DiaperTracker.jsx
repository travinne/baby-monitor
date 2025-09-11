import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";


function DiaperTracker() {
  const [entries, setEntries] = useState([]);
  const [messType, setMessType] = useState("");
  const [lastChange, setLastChange] = useState(null);

  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleAddEntry = () => {
    if (!messType) return;

    const now = new Date().toLocaleString();
    const newEntry = { messType, time: now };

    setEntries([newEntry, ...entries]);
    setLastChange(now);

    setMessType("");
  };

  useEffect(() => {
    let countdown;
    if (isRunning && timeLeft > 0) {
      countdown = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      alert("⏰ Time to change the baby's diaper!");
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
      <h2 className="title">Diaper Tracker</h2>

      {lastChange ? (
        <p className="last-change">
          Last change: <strong>{lastChange}</strong>
        </p>
      ) : (
        <p className="last-change">No diaper changes logged yet</p>
      )}

      <select
        value={messType}
        onChange={(e) => setMessType(e.target.value)}
        className="select"
      >
        <option value="">Select Mess Type</option>
        <option value="Pee">Pee </option>
        <option value="Poop">Poop </option>
        <option value="Mixed">Mixed </option>
      </select>

      <button onClick={handleAddEntry} className="btn">
        Add Entry
      </button>

      <h3 className="history-title">Change History</h3>
      {entries.length === 0 ? (
        <p className="empty">No history yet</p>
      ) : (
        <ul className="log-list">
          {entries.map((entry, index) => (
            <li key={index} className="log-item">
              <div>
                <span className="log-mess">{entry.messType}</span>
              </div>
              <div className="time">{entry.time}</div>
            </li>
          ))}
        </ul>
      )}

      <h3 className="history-title">Set Diaper Change Timer</h3>
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

export default DiaperTracker;
