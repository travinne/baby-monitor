import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";

function BathTimeTracker() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("bathEntries");
    return saved ? JSON.parse(saved) : [];
  });
  const [notes, setNotes] = useState("");
  const [lastBath, setLastBath] = useState(null);

  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (entries.length > 0) {
      setLastBath(entries[0].time);
      localStorage.setItem("bathEntries", JSON.stringify(entries));
    }
  }, [entries]);

  const playAlarm = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 550 + (i * 100);
        oscillator.type = 'triangle';
        gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
        oscillator.start();
        setTimeout(() => oscillator.stop(), 300);
      }, i * 350);
    }
  };

  const handleAddEntry = () => {
    const now = new Date().toLocaleString();
    const newEntry = { 
      time: now,
      notes: notes || "No notes"
    };
    
    setEntries([newEntry, ...entries]);
    setLastBath(now);
    setNotes("");
  };

  const handleDeleteEntry = (index) => {
    if (window.confirm("Delete this bath record?")) {
      const updated = entries.filter((_, i) => i !== index);
      setEntries(updated);
      if (updated.length === 0) {
        localStorage.removeItem("bathEntries");
        setLastBath(null);
      }
    }
  };

  useEffect(() => {
    let countdown;
    if (isRunning && timeLeft > 0) {
      countdown = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      playAlarm();
      alert("Time for your baby's bath!");
      setIsRunning(false);
      setTimeLeft(null);
    }
    return () => clearInterval(countdown);
  }, [isRunning, timeLeft]);

  const handleStartTimer = () => {
    const d = parseInt(days) || 0;
    const h = parseInt(hours) || 0;
    
    if (d === 0 && h === 0) {
      alert("Please enter days or hours");
      return;
    }

    if (d < 0 || h < 0) {
      alert("Please enter valid time values");
      return;
    }

    const totalSeconds = d * 86400 + h * 3600;
    setTimeLeft(totalSeconds);
    setIsRunning(true);
  };

  const handleResetTimer = () => {
    if (window.confirm("Reset the bath reminder?")) {
      setIsRunning(false);
      setTimeLeft(null);
      setDays("");
      setHours("");
    }
  };

  const formatTime = (seconds) => {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${d > 0 ? d + "d " : ""}${h}h ${m}m ${s}s`;
  };

  const calculateTimeSinceLastBath = () => {
    if (!lastBath) return null;
    const last = new Date(lastBath);
    const now = new Date();
    const diffMs = now - last;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    const remainingHours = diffHours % 24;
    
    if (diffDays > 0) {
      return `${diffDays}d ${remainingHours}h ago`;
    } else {
      return `${diffHours}h ago`;
    }
  };

  return (
    <div className="container">
      <BackButton />
      <h2 className="title">Bath Time Tracker</h2>

      {lastBath ? (
        <div>
          <p className="last-change">
            Last bath: <strong>{lastBath}</strong>
          </p>
          <p style={{ textAlign: 'center', color: '#666', marginTop: '8px' }}>
            ({calculateTimeSinceLastBath()})
          </p>
        </div>
      ) : (
        <p className="last-change">No baths logged yet</p>
      )}

      <div className="form">
        <label>Notes (optional)</label>
        <textarea
          placeholder="Temperature, products used, baby's mood, etc..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="input"
          rows="2"
        />

        <button onClick={handleAddEntry} className="btn">
          Log Bath
        </button>
      </div>

      <h3 className="history-title">Bath History</h3>
      {entries.length === 0 ? (
        <p className="empty">No history yet</p>
      ) : (
        <ul className="log-list">
          {entries.map((entry, index) => (
            <li key={index} className="log-item">
              <div>
                <span className="log-feed">Bath Time</span>
                {entry.notes !== "No notes" && (
                  <p style={{ fontSize: '0.9em', color: '#666', marginTop: '4px' }}>{entry.notes}</p>
                )}
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span className="time">{entry.time}</span>
                <button 
                  onClick={() => handleDeleteEntry(index)}
                  className="btn delete-btn"
                  style={{ padding: '4px 8px', fontSize: '0.9em' }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h3 className="history-title">Set Bath Reminder</h3>
      <div className="timer">
        <input
          type="number"
          min="0"
          placeholder="Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="select"
          disabled={isRunning}
        />
        <input
          type="number"
          min="0"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="select"
          disabled={isRunning}
        />
        {!isRunning ? (
          <button onClick={handleStartTimer} className="btn">
            Start Timer
          </button>
        ) : (
          <button onClick={handleResetTimer} className="btn remove-btn">
            Reset Timer
          </button>
        )}
      </div>

      {isRunning && timeLeft !== null && (
        <p className="countdown">Next bath in: {formatTime(timeLeft)}</p>
      )}
    </div>
  );
}

export default BathTimeTracker;