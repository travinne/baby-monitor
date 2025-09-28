import React, { useState } from 'react';
import BackButton from './BackButton';

function Allergies() {
  const [allergy, setAllergy] = useState("");
  const [reaction, setReaction] = useState("");
  const [severity, setSeverity] = useState("");
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
    setSeverity("");
    setPrevention("");
    setCurative("");
    setNotes("");
  };

  const handleDelete = (id) => {
    setHistory(history.filter((entry) => entry.id !== id));
  };

  return (
    <div className="container">
      <BackButton/>
      <h2 className="text-center mb-4">Allergies Tracker</h2>
      
      <div className="card p-4 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Allergy:</label>
            <input
              type="text"
              className="form-control"
              value={allergy}
              onChange={(e) => setAllergy(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Reaction:</label>
            <input
              type="text"
              className="form-control"
              value={reaction}
              onChange={(e) => setReaction(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Severity:</label>
            <select 
              className="form-control"
              value={severity} 
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="">Select Severity</option>
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Prevention:</label>
            <input
              type="text"
              className="form-control"
              value={prevention}
              onChange={(e) => setPrevention(e.target.value)}
              placeholder="e.g., avoid dust"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Curative:</label>
            <input
              type="text"
              className="form-control"
              value={curative}
              onChange={(e) => setCurative(e.target.value)}
              placeholder="e.g., Give water"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Notes:</label>
            <textarea
              className="form-control"
              rows="4"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional details..."
            />
          </div>

          <button type="submit" className="btn btn-primary">Add Allergy Record</button>
        </form>
      </div>

      <div className="card p-4">
        <h3 className="mb-4">Allergy History</h3>
        {history.length === 0 ? (
          <div className="empty">No allergy records yet.</div>
        ) : (
          <div className="log-list">
            {history.map((entry) => (
              <div key={entry.id} className="log-item">
                <div className="d-flex justify-between items-center mb-2">
                  <h4 className="mb-0">{entry.allergy}</h4>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(entry.id)}
                  >
                    Delete
                  </button>
                </div>
                <p><strong>Reaction:</strong> {entry.reaction}</p>
                <p><strong>Severity:</strong> {entry.severity}</p>
                {entry.prevention && <p><strong>Prevention:</strong> {entry.prevention}</p>}
                {entry.curative && <p><strong>Curative:</strong> {entry.curative}</p>}
                {entry.notes && <p><strong>Notes:</strong> {entry.notes}</p>}
                <p className="text-tertiary"><small>Recorded: {entry.date}</small></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Allergies;