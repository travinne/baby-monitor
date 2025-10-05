import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";

function FeedingTracker() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("feedingEntries");
    return saved ? JSON.parse(saved) : [];
  });
  const [feedType, setFeedType] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [lastFeed, setLastFeed] = useState(null);

  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (entries.length > 0) {
      setLastFeed(entries[0].time);
      localStorage.setItem("feedingEntries", JSON.stringify(entries));
    }
  }, [entries]);

  const playAlarm = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
      setTimeout(() => {
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);
        osc2.frequency.value = 1000;
        osc2.type = 'sine';
        gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
        osc2.start();
        setTimeout(() => osc2.stop(), 300);
      }, 100);
    }, 300);
  };

  const handleAddEntry = () => {
    if (!feedType) {
      alert("Please select a feed type");
      return;
    }

    const now = new Date().toLocaleString();
    const newEntry = { 
      feedType, 
      amount: amount || "Not specified",
      notes: notes || "",
      time: now 
    };

    setEntries([newEntry, ...entries]);
    setLastFeed(now);
    setFeedType("");
    setAmount("");
    setNotes("");
  };

  const handleDeleteEntry = (index) => {
    if (window.confirm("Delete this feeding entry?")) {
      const updated = entries.filter((_, i) => i !== index);
      setEntries(updated);
      if (updated.length === 0) {
        localStorage.removeItem("feedingEntries");
        setLastFeed(null);
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
      alert("Time to feed the baby!");
      setIsRunning(false);
      setTimeLeft(null);
    }
    return () => clearInterval(countdown);
  }, [isRunning, timeLeft]);

  const handleStartTimer = () => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    
    if (h === 0 && m === 0) {
      alert("Please enter hours or minutes");
      return;
    }

    if (h < 0 || m < 0 || m > 59) {
      alert("Please enter valid time values");
      return;
    }

    const totalSeconds = h * 3600 + m * 60;
    setTimeLeft(totalSeconds);
    setIsRunning(true);
  };

  const handleResetTimer = () => {
    if (window.confirm("Reset the timer?")) {
      setIsRunning(false);
      setTimeLeft(null);
      setHours("");
      setMinutes("");
    }
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
      <h2 className="title">Feeding Tracker</h2>

      {lastFeed ? (
        <p className="last-feed">
          Last feed: <strong>{lastFeed}</strong>
        </p>
      ) : (
        <p className="last-feed">No feedings logged yet</p>
      )}

      <div className="form">
        <label>Feed Type</label>
        <select
          value={feedType}
          onChange={(e) => setFeedType(e.target.value)}
          className="select"
        >
          <option value="">Select Feed Type</option>
          <option value="Breast Milk">Breast Milk</option>
          <option value="Formula">Formula</option>
          <option value="Solid Food">Solid Food</option>
          <option value="Snack">Snack</option>
        </select>

        <label>Amount (optional)</label>
        <input
          type="text"
          placeholder="e.g., 120ml, 1 jar, half portion"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
        />

        <label>Notes (optional)</label>
        <textarea
          placeholder="Any observations or notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="input"
          rows="2"
        />

        <button onClick={handleAddEntry} className="btn">
          Add Feeding
        </button>
      </div>

      <h3 className="history-title">Feeding History</h3>
      {entries.length === 0 ? (
        <p className="empty">No history yet</p>
      ) : (
        <ul className="log-list">
          {entries.map((entry, index) => (
            <li key={index} className="log-item">
              <div>
                <span className="log-feed">{entry.feedType}</span>
                {entry.amount !== "Not specified" && (
                  <span> - {entry.amount}</span>
                )}
                {entry.notes && (
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

      <h3 className="history-title">Set Feeding Timer</h3>
      <div className="timer">
        <input
          type="number"
          min="0"
          max="24"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="select"
          disabled={isRunning}
        />
        <input
          type="number"
          min="0"
          max="59"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
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
        <p className="countdown">Time left: {formatTime(timeLeft)}</p>
      )}
    </div>
  );
}

export default FeedingTracker;