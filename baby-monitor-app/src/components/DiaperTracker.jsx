import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";

function DiaperTracker() {
  const [entries, setEntries] = useState([]);
  const [messType, setMessType] = useState("");
  const [lastChange, setLastChange] = useState("");

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
      alert("Time to change the baby's diaper!");
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
      <BackButton/>
      <h2 className="text-center mb-4">Diaper Tracker</h2>

      <div className="card p-4 mb-4">
        {lastChange ? (
          <p className="text-center mb-4">
            Last change: <strong>{lastChange}</strong>
          </p>
        ) : (
          <p className="text-center mb-4">No diaper changes logged yet</p>
        )}

        <div className="form-group">
          <select
            className="form-control"
            value={messType}
            onChange={(e) => setMessType(e.target.value)}
          >
            <option value="">Select Mess Type</option>
            <option value="Pee">Pee</option>
            <option value="Poop">Poop</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>

        <button onClick={handleAddEntry} className="btn btn-primary">
          Add Entry
        </button>
      </div>

      <div className="card p-4 mb-4">
        <h3 className="mb-4">Change History</h3>
        {entries.length === 0 ? (
          <div className="empty">No history yet</div>
        ) : (
          <div className="log-list">
            {entries.map((entry, index) => (
              <div key={index} className="log-item">
                <div className="d-flex justify-between items-center">
                  <span className="badge">{entry.messType}</span>
                  <span className="text-tertiary">{entry.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card p-4">
        <h3 className="mb-4">Set Diaper Change Timer</h3>
        <div className="timer">
          <input
            type="number"
            min="0"
            placeholder="Hours"
            className="timer-input"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="Minutes"
            className="timer-input"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
          <button onClick={handleStartTimer} className="btn btn-primary">
            Start Timer
          </button>
        </div>

        {isRunning && timeLeft !== null && (
          <div className="countdown mt-4">
            Time left: {formatTime(timeLeft)}
          </div>
        )}
      </div>
    </div>
  );
}

export default DiaperTracker;