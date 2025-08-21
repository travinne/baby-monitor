import React, { useState } from "react";

function SleepTracker() {
  const [sleepStart, setSleepStart] = useState(null);
  const [sleepEnd, setSleepEnd] = useState(null);
  const [history, setHistory] = useState([]);

  const startSleep = () => {
    setSleepStart(new Date());
    setSleepEnd(null);
  };

  const endSleep = () => {
    if (!sleepStart) return;
    const end = new Date();
    setSleepEnd(end);

    const durationMinutes = Math.floor((end - sleepStart) / 1000 / 60);
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    
    const newEntry = {
         start: sleepStart.toLocaleString(),
         end:sleepEnd.toLocaleString(),
         duration: `${hours}h ${minutes}m`,
    };

    setHistory([newEntry, ...history]);
    setSleepStart(null);
    setSleepEnd(null);
  };

  return (
    <div className="sleep-tracker">
      <h2>Sleep Tracker</h2>
      <div className="controls">
        {!sleepStart ? (
          <button onClick={startSleep} className="btn">
            Start Sleep
          </button>
        ) : (
          <button onClick={endSleep} className="btn">
            End Sleep
          </button>
        )}
      </div>

      {sleepStart && (
        <p>Sleep started at: {sleepStart.toLocaleTimeString()}</p>
      )}

      <h3>History</h3>
      <ul className="history">
        {history.map((entry, index) => (
          <li key={index}>
            <strong>{entry.duration}</strong> — {entry.start} → {entry.end}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SleepTracker;
