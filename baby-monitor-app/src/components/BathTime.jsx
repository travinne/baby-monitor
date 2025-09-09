import React, { useState } from "react";

function BathTimeTracker(){
    const [entries, setEntries] = useState([]);
    const [lastBath, setLastBath] = useState(null);

    const [days, setDays] = useState("");
    const [hours, setHours] = useState("");
    const [timeLeft, setTimeLeft] = useState("");
    const [isRunning, setIsRunning] = useState(false);

    const handleAddEntry = () => {
        const now = new Date().toLocaleString()
         const newEntry = { time: now };
        setEntries ([newEntry, ...entries])
        setLastBath(now);

    }

     useEffect(() => {
    let countdown;
    if (isRunning && timeLeft > 0) {
      countdown = setInterval(() => {
        setTimeLeft((prev) => prev - 60);
      }, 60000);
    } else if (timeLeft === 0) {
      alert("🛁 Time for your baby’s bath!");
      setIsRunning(false);
    }
    return () => clearInterval(countdown);
  }, [isRunning, timeLeft]);

  const handleStartTimer = () => {
    const d = parseInt(days) || 0;
    const h = parseInt(hours) || 0;
    if (d === 0 && h === 0) return;

    const totalSeconds = d * 86400 + h * 3600;
    setTimeLeft(totalSeconds);
    setIsRunning(true);
  };

  const formatTime = (seconds) => {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${d > 0 ? d + "d " : ""}${h}h ${m}m`;
  };

  return (
    <div className="container">
      <h2 className="title"> Bath Time Tracker</h2>

      {lastBath ? (
        <p className="last-change">
          Last bath: <strong>{lastBath}</strong>
        </p>
      ) : (
        <p className="last-change">No baths logged yet</p>
      )}

      <button onClick={handleAddEntry} className="btn">
        Log Bath
      </button>

      <h3 className="history-title"> Bath History</h3>
      {entries.length === 0 ? (
        <p className="empty">No history yet</p>
      ) : (
        <ul className="log-list">
          {entries.map((entry, index) => (
            <li key={index} className="log-item">
              <div className="time">{entry.time}</div>
            </li>
          ))}
        </ul>
      )}

      <h3 className="history-title"> Set Bath Reminder</h3>
      <div className="timer">
        <input
          type="number"
          min="0"
          placeholder="Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="select"
        />
        <input
          type="number"
          min="0"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="select"
        />
        <button onClick={handleStartTimer} className="btn">
          Start Timer
        </button>
      </div>

      {isRunning && timeLeft !== null && (
        <p className="countdown">Next bath in: {formatTime(timeLeft)}</p>
      )}
    </div>
  );
}

export default BathTimeTracker;