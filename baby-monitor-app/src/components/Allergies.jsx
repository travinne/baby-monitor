import React, { useState } from "react";
import BackButton from "./BackButton";


function Allergies() {
  const [allergy, setAllergy] = useState("");
  const [reaction, setReaction] = useState("");
  const [severity, setSeverity] = useState("Mild");
  const [prevention, setPrevention] = useState("");
  const [curative, setCurative] = useState("");
  const [notes, setNotes] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      id: Date.now(),
      allergy,
      reaction,
      severity,
      prevention,
      curative,
      notes,
      date: new Date().toLocaleString(),
    };

    setHistory([newEntry, ...history]);

    setAllergy("");
    setReaction("");
    setSeverity("Mild");
    setPrevention("");
    setCurative("");
    setNotes("");
  };

  const handleDelete = (id) => {
    setHistory(history.filter((entry) => entry.id !== id));
  };

  return (
    <div className="allergies">
       <BackButton />
      <h2>Allergies Tracker</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Allergy / Trigger:</label>
          <input
            type="text"
            value={allergy}
            onChange={(e) => setAllergy(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Reaction:</label>
          <input
            type="text"
            value={reaction}
            onChange={(e) => setReaction(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Severity:</label>
          <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
          </select>
        </div>

        <div>
          <label>Prevention:</label>
          <input
            type="text"
            value={prevention}
            onChange={(e) => setPrevention(e.target.value)}
            placeholder="e.g., Avoid dust"
          />
        </div>

        <div>
          <label>Curative:</label>
          <input
            type="text"
            value={curative}
            onChange={(e) => setCurative(e.target.value)}
            placeholder="e.g., Give water"
          />
        </div>

        <div>
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional details..."
          />
        </div>

        <button type="submit">Add Allergy Record</button>
      </form>

      <h3>Allergy History</h3>
      {history.length === 0 ? (
        <p>No allergy records yet.</p>
      ) : (
        <ul>
          {history.map((entry) => (
            <li key={entry.id}>
              <strong>{entry.allergy}</strong> — {entry.reaction}  
              <br />
              <em>Severity:</em> {entry.severity}  
              <br />
              {entry.prevention && (
                <>
                  <em>Prevention:</em> {entry.prevention} <br />
                </>
              )}
              {entry.curative && (
                <>
                  <em>Curative:</em> {entry.curative} <br />
                </>
              )}
              <em>Date:</em> {entry.date}  
              <br />
              {entry.notes && <p>{entry.notes}</p>}
              <button onClick={() => handleDelete(entry.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Allergies;
