import React, { useState } from "react";

function DiaperTracker() {
  const [entries, setEntries] = useState([]);
  const [diaperType, setDiaperType] = useState("");
  const [messType, setMessType] = useState("");
  const [lastChange, setLastChange] = useState(null);

  const handleAddEntry = () => {
    if (!diaperType || !messType) return;

    const now = new Date().toLocaleString();
    const newEntry = { diaperType, messType, time: now };

    setEntries([newEntry, ...entries]);
    setLastChange(now);

    setDiaperType("");
    setMessType("");
  };

  return (
    <div className="container">
      <h2 className="title"> Diaper Tracker</h2>

      {lastChange ? (
        <p className="last-change">
           Last change: <strong>{lastChange}</strong>
        </p>
      ) : (
        <p className="last-change">No diaper changes logged yet</p>
      )}

      <select
        value={diaperType}
        onChange={(e) => setDiaperType(e.target.value)}
        className="select"
      >
        <option value="">Select Diaper Type</option>
        <option value="Wet">Wet 💧</option>
        <option value="Dirty">Dirty 💩</option>
        <option value="Both">Both 💧💩</option>
      </select>

      <select
        value={messType}
        onChange={(e) => setMessType(e.target.value)}
        className="select"
      >
        <option value="">Select Mess Type</option>
        <option value="Pee">Pee 💧</option>
        <option value="Poop">Poop 💩</option>
        <option value="Mixed">Mixed 💧💩</option>
      </select>

      <button onClick={handleAddEntry} className="btn">
        Add Entry
      </button>

     <h3 className="history-title"> Change History</h3>
      {entries.length === 0 ? (
        <p className="empty">No history yet</p>
      ) : (
        <ul className="log-list">
          {entries.map((entry, index) => (
            <li key={index} className="log-item">
              <div>
                <span className="log-type">{entry.diaperType}</span> –{" "}
                <span className="log-mess">{entry.messType}</span>
              </div>
              <div className="time">{entry.time}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DiaperTracker;