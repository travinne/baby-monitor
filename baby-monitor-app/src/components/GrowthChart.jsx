import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";

function GrowthTracker() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("growthEntries");
    return saved ? JSON.parse(saved) : [];
  });
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [headCircumference, setHeadCircumference] = useState("");
  const [notes, setNotes] = useState("");
  const [lastEntry, setLastEntry] = useState(null);

  const [months, setMonths] = useState("");
  const [days, setDays] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (entries.length > 0) {
      setLastEntry(entries[0].time);
      localStorage.setItem("growthEntries", JSON.stringify(entries));
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
        oscillator.frequency.value = 440 + (i * 100);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
        oscillator.start();
        setTimeout(() => oscillator.stop(), 300);
      }, i * 400);
    }
  };

  const handleAddEntry = () => {
    if (!weight || !height) {
      alert("Please enter both weight and height");
      return;
    }

    if (parseFloat(weight) <= 0 || parseFloat(weight) > 50) {
      alert("Please enter a valid weight (0-50 kg)");
      return;
    }

    if (parseFloat(height) <= 0 || parseFloat(height) > 200) {
      alert("Please enter a valid height (0-200 cm)");
      return;
    }

    if (headCircumference && (parseFloat(headCircumference) <= 0 || parseFloat(headCircumference) > 100)) {
      alert("Please enter a valid head circumference (0-100 cm)");
      return;
    }

    const now = new Date().toLocaleString();
    const newEntry = { 
      weight: parseFloat(weight).toFixed(2), 
      height: parseFloat(height).toFixed(1),
      headCircumference: headCircumference ? parseFloat(headCircumference).toFixed(1) : "Not measured",
      notes: notes || "No notes",
      time: now 
    };

    setEntries([newEntry, ...entries]);
    setLastEntry(now);
    setWeight("");
    setHeight("");
    setHeadCircumference("");
    setNotes("");
  };

  const handleDeleteEntry = (index) => {
    if (window.confirm("Delete this growth entry?")) {
      const updated = entries.filter((_, i) => i !== index);
      setEntries(updated);
      if (updated.length === 0) {
        localStorage.removeItem("growthEntries");
        setLastEntry(null);
      }
    }
  };

  useEffect(() => {
    if (!isRunning || timeLeft === null) return;

    if (timeLeft <= 0) {
      playAlarm();
      alert("Time to check the baby's growth again!");
      setIsRunning(false);
      setTimeLeft(null);
      return;
    }

    const countdown = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, [isRunning, timeLeft]);

  const handleStartTimer = () => {
    const m = parseInt(months) || 0;
    const d = parseInt(days) || 0;
    
    if (m === 0 && d === 0) {
      alert("Please enter months or days");
      return;
    }

    if (m < 0 || d < 0) {
      alert("Please enter valid time values");
      return;
    }

    const totalSeconds = m * 30 * 24 * 3600 + d * 24 * 3600;
    setTimeLeft(totalSeconds);
    setIsRunning(true);
  };

  const handleResetTimer = () => {
    if (window.confirm("Reset the growth check reminder?")) {
      setIsRunning(false);
      setTimeLeft(null);
      setMonths("");
      setDays("");
    }
  };

  const formatTime = (seconds) => {
    const totalDays = Math.floor(seconds / (24 * 3600));
    const m = Math.floor(totalDays / 30);
    const d = totalDays % 30;
    const h = Math.floor((seconds % (24 * 3600)) / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${m}m ${d}d ${h}h ${min}m ${s < 10 ? "0" : ""}${s}s`;
  };

  const calculateGrowth = () => {
    if (entries.length < 2) return null;
    const latest = entries[0];
    const previous = entries[1];
    const weightChange = (parseFloat(latest.weight) - parseFloat(previous.weight)).toFixed(2);
    const heightChange = (parseFloat(latest.height) - parseFloat(previous.height)).toFixed(1);
    return { weightChange, heightChange };
  };

  const growth = calculateGrowth();

  return (
    <div className="container">
      <BackButton />
      <h2 className="title">Growth Tracker</h2>

      {lastEntry ? (
        <p className="last-change">
          Last entry: <strong>{lastEntry}</strong>
        </p>
      ) : (
        <p className="last-change">No growth records logged yet</p>
      )}

      {growth && (
        <div style={{ padding: '15px', background: '#f0f0f0', borderRadius: '8px', marginBottom: '20px' }}>
          <p style={{ margin: '5px 0' }}>
            <strong>Growth Since Last Entry:</strong>
          </p>
          <p style={{ margin: '5px 0' }}>
            Weight: {growth.weightChange > 0 ? '+' : ''}{growth.weightChange} kg
          </p>
          <p style={{ margin: '5px 0' }}>
            Height: {growth.heightChange > 0 ? '+' : ''}{growth.heightChange} cm
          </p>
        </div>
      )}

      <div className="form">
        <div className="input-group">
          <input
            type="number"
            step="0.01"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="select"
          />
          <input
            type="number"
            step="0.1"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="select"
          />
        </div>

        <input
          type="number"
          step="0.1"
          placeholder="Head Circumference (cm) - optional"
          value={headCircumference}
          onChange={(e) => setHeadCircumference(e.target.value)}
          className="input"
        />

        <label>Notes (optional)</label>
        <textarea
          placeholder="Any observations about growth, milestones, etc..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="input"
          rows="2"
        />

        <button onClick={handleAddEntry} className="btn">
          Add Entry
        </button>
      </div>

      <h3 className="history-title">Growth History</h3>
      {entries.length === 0 ? (
        <p className="empty">No growth records yet</p>
      ) : (
        <ul className="log-list">
          {entries.map((entry, index) => (
            <li key={index} className="log-item">
              <div>
                <span className="log-mess">
                  {entry.weight} kg | {entry.height} cm
                  {entry.headCircumference !== "Not measured" && ` | Head: ${entry.headCircumference} cm`}
                </span>
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

      <h3 className="history-title">Set Growth Check Reminder</h3>
      <div className="timer">
        <input
          type="number"
          min="0"
          placeholder="Months"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          className="select"
          disabled={isRunning}
        />
        <input
          type="number"
          min="0"
          placeholder="Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="select"
          disabled={isRunning}
        />
        {!isRunning ? (
          <button onClick={handleStartTimer} className="btn">
            Start Reminder
          </button>
        ) : (
          <button onClick={handleResetTimer} className="btn remove-btn">
            Reset
          </button>
        )}
      </div>

      {isRunning && timeLeft !== null && (
        <p className="countdown">Time left: {formatTime(timeLeft)}</p>
      )}
    </div>
  );
}

export default GrowthTracker;