import React, { useState } from "react";

export default function FeedTracker() {
  const [feedType, setFeedType] = useState("");
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFeed = {
      id: Date.now(),
      feedType,
      amount,
      time: time || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setHistory([newFeed, ...history]); 
    setAmount("");
    setTime("");
  };

  return (
    <div className="feed-container">
      <h2 className="feed-title">Feed Tracker</h2>

      <form className="feed-form" onSubmit={handleSubmit}>
        <label>Feed Type:</label>
        <select value={feedType} onChange={(e) => setFeedType(e.target.value)} className="feed-select">
          <option value="breast">Breast</option>
          <option value="bottle">Bottle</option>
          <option value="solid">Solid</option>
        </select>

        <label>Amount (ml / oz):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="feed-input"
        />

        <label>Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="feed-input"
        />

        <button type="submit" className="feed-button">Log Feed</button>
      </form>

      <h3 className="feed-history-title">Feed History</h3>
      <ul className="feed-history">
        {history.length === 0 ? (
          <p className="feed-empty">No feeds logged yet</p>
        ) : (
          history.map((feed) => (
            <li key={feed.id} className="feed-item">
              <strong>{feed.feedType}</strong> — {feed.amount} — {feed.time}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
