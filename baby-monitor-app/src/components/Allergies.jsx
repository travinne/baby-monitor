import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";

function Allergies() {
  const [allergies, setAllergies] = useState(() => {
    const saved = localStorage.getItem("allergies");
    return saved ? JSON.parse(saved) : [];
  });
  const [allergyName, setAllergyName] = useState("");
  const [severity, setSeverity] = useState("");
  const [reaction, setReaction] = useState("");
  const [notes, setNotes] = useState("");
  const [diagnosedDate, setDiagnosedDate] = useState("");

  useEffect(() => {
    localStorage.setItem("allergies", JSON.stringify(allergies));
  }, [allergies]);

  const handleAddAllergy = () => {
    if (!allergyName || !severity) {
      alert("Please enter allergy name and severity level");
      return;
    }

    if (allergies.some(allergy => allergy.name.toLowerCase() === allergyName.toLowerCase())) {
      alert("This allergy is already in the list");
      return;
    }

    const newAllergy = {
      id: Date.now(),
      name: allergyName.trim(),
      severity: severity,
      reaction: reaction || "Not specified",
      notes: notes || "No additional notes",
      diagnosedDate: diagnosedDate || "Not specified",
      addedOn: new Date().toLocaleString()
    };

    setAllergies([...allergies, newAllergy]);
    
    setAllergyName("");
    setSeverity("");
    setReaction("");
    setNotes("");
    setDiagnosedDate("");
  };

  const handleDeleteAllergy = (id) => {
    if (window.confirm("Are you sure you want to remove this allergy from the list?")) {
      const updated = allergies.filter(allergy => allergy.id !== id);
      setAllergies(updated);
      if (updated.length === 0) {
        localStorage.removeItem("allergies");
      }
    }
  };

  const handleEditAllergy = (id) => {
    const allergy = allergies.find(a => a.id === id);
    if (allergy) {
      setAllergyName(allergy.name);
      setSeverity(allergy.severity);
      setReaction(allergy.reaction === "Not specified" ? "" : allergy.reaction);
      setNotes(allergy.notes === "No additional notes" ? "" : allergy.notes);
      setDiagnosedDate(allergy.diagnosedDate === "Not specified" ? "" : allergy.diagnosedDate);
      handleDeleteAllergy(id);
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity.toLowerCase()) {
      case "mild":
        return "#f6ad55";
      case "moderate":
        return "#ed8936";
      case "severe":
        return "#fc8181";
      default:
        return "#718096";
    }
  };

  const exportAllergies = () => {
    if (allergies.length === 0) {
      alert("No allergies to export");
      return;
    }

    const allergyText = allergies.map(allergy => 
      `Allergy: ${allergy.name}\nSeverity: ${allergy.severity}\nReaction: ${allergy.reaction}\nNotes: ${allergy.notes}\nDiagnosed: ${allergy.diagnosedDate}\n---`
    ).join('\n');

    const blob = new Blob([allergyText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `baby-allergies-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <BackButton />
      <h2 className="title">Allergies & Sensitivities</h2>

      {allergies.length > 0 && (
        <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '8px', marginBottom: '20px', borderLeft: '5px solid #f6ad55' }}>
          <strong>Important:</strong> Always inform healthcare providers and caregivers about these allergies.
        </div>
      )}

      <div className="form">
        <label>Allergy Name *</label>
        <input
          type="text"
          placeholder="e.g., Peanuts, Milk, Eggs, etc."
          value={allergyName}
          onChange={(e) => setAllergyName(e.target.value)}
          className="input"
        />

        <label>Severity Level *</label>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="select"
        >
          <option value="">Select Severity</option>
          <option value="Mild">Mild</option>
          <option value="Moderate">Moderate</option>
          <option value="Severe">Severe</option>
        </select>

        <label>Typical Reaction (optional)</label>
        <input
          type="text"
          placeholder="e.g., Hives, Swelling, Difficulty breathing"
          value={reaction}
          onChange={(e) => setReaction(e.target.value)}
          className="input"
        />

        <label>Date Diagnosed (optional)</label>
        <input
          type="date"
          value={diagnosedDate}
          onChange={(e) => setDiagnosedDate(e.target.value)}
          className="input"
          max={new Date().toISOString().split('T')[0]}
        />

        <label>Additional Notes (optional)</label>
        <textarea
          placeholder="Treatment, medications to avoid, emergency procedures, etc..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="input"
          rows="3"
        />

        <button onClick={handleAddAllergy} className="btn btn-primary">
          Add Allergy
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
        <h3 className="history-title" style={{ margin: 0 }}>Allergy List</h3>
        {allergies.length > 0 && (
          <button onClick={exportAllergies} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9em' }}>
            Export List
          </button>
        )}
      </div>

      {allergies.length === 0 ? (
        <p className="empty">No allergies recorded. Great news!</p>
      ) : (
        <ul className="allergies" style={{ listStyle: 'none', padding: 0 }}>
          {allergies.map((allergy) => (
            <li 
              key={allergy.id} 
              style={{ 
                background: 'var(--surface-color)',
                padding: '20px',
                margin: '16px 0',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: 'var(--shadow-md)',
                borderLeft: `5px solid ${getSeverityColor(allergy.severity)}`,
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '1.2em', marginBottom: '8px', color: 'var(--text-primary)' }}>
                    {allergy.name}
                  </h4>
                  <p style={{ 
                    display: 'inline-block',
                    background: getSeverityColor(allergy.severity),
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.85em',
                    fontWeight: 'bold',
                    marginBottom: '8px'
                  }}>
                    {allergy.severity}
                  </p>
                  
                  {allergy.reaction !== "Not specified" && (
                    <p style={{ margin: '8px 0', fontSize: '0.95em' }}>
                      <strong>Reaction:</strong> {allergy.reaction}
                    </p>
                  )}
                  
                  {allergy.diagnosedDate !== "Not specified" && (
                    <p style={{ margin: '8px 0', fontSize: '0.9em', color: '#666' }}>
                      <strong>Diagnosed:</strong> {new Date(allergy.diagnosedDate).toLocaleDateString()}
                    </p>
                  )}
                  
                  {allergy.notes !== "No additional notes" && (
                    <p style={{ margin: '8px 0', fontSize: '0.9em', color: '#666', fontStyle: 'italic' }}>
                      {allergy.notes}
                    </p>
                  )}
                  
                  <p style={{ fontSize: '0.8em', color: '#999', marginTop: '8px' }}>
                    Added: {allergy.addedOn}
                  </p>
                </div>
                
                <div style={{ display: 'flex', gap: '8px', marginLeft: '10px' }}>
                  <button 
                    onClick={() => handleEditAllergy(allergy.id)}
                    className="btn btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.85em' }}
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteAllergy(allergy.id)}
                    className="btn delete-btn"
                    style={{ padding: '6px 12px', fontSize: '0.85em' }}
                    title="Delete"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {allergies.length > 0 && (
        <div style={{ marginTop: '30px', padding: '15px', background: '#f0f0f0', borderRadius: '8px' }}>
          <h4 style={{ marginBottom: '10px' }}>Emergency Information</h4>
          <p style={{ fontSize: '0.9em', marginBottom: '8px' }}>
            <strong>Total Allergies:</strong> {allergies.length}
          </p>
          <p style={{ fontSize: '0.9em', marginBottom: '8px' }}>
            <strong>Severe Allergies:</strong> {allergies.filter(a => a.severity.toLowerCase() === 'severe').length}
          </p>
          <p style={{ fontSize: '0.85em', color: '#666', marginTop: '10px' }}>
            Keep this list updated and share it with all caregivers, family members, and healthcare providers.
          </p>
        </div>
      )}
    </div>
  );
}

export default Allergies;