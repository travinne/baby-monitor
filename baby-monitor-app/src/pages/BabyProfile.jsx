import React, { useState } from "react";
import BackButton from "../components/BackButton";

function BabyProfile() {
  const storedBaby = JSON.parse(localStorage.getItem("baby"));
  const [baby, setBaby] = useState(
    storedBaby || {
      fullName: "",
      dob: "",
      gender: "",
      weight: "",
      height: "",
      photo: "",
      notes: "",
    }
  );

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "fullName":
        if (value.trim().length < 2) {
          newErrors.fullName = "Name must be at least 2 characters";
        } else {
          delete newErrors.fullName;
        }
        break;
      case "dob":
        const birthDate = new Date(value);
        const today = new Date();
        if (birthDate > today) {
          newErrors.dob = "Date of birth cannot be in the future";
        } else {
          delete newErrors.dob;
        }
        break;
      case "weight":
        if (value && (isNaN(value) || parseFloat(value) <= 0 || parseFloat(value) > 50)) {
          newErrors.weight = "Please enter a valid weight (0-50 kg)";
        } else {
          delete newErrors.weight;
        }
        break;
      case "height":
        if (value && (isNaN(value) || parseFloat(value) <= 0 || parseFloat(value) > 200)) {
          newErrors.height = "Please enter a valid height (0-200 cm)";
        } else {
          delete newErrors.height;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBaby({ ...baby, [name]: value });
    validateField(name, value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file");
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setBaby({ ...baby, photo: imageUrl });
    }
  };

  const handleRemovePhoto = () => {
    if (window.confirm("Are you sure you want to remove the photo?")) {
      setBaby({ ...baby, photo: "" });
    }
  };

  const handleSave = () => {
    Object.keys(baby).forEach(key => {
      if (baby[key]) {
        validateField(key, baby[key]);
      }
    });

    if (!baby.fullName || !baby.dob) {
      alert("Please fill in at least the name and date of birth");
      return;
    }

    if (Object.keys(errors).length > 0) {
      alert("Please fix all errors before saving");
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem("baby", JSON.stringify(baby));
      setIsSaving(false);
      alert("Baby profile updated successfully!");
    }, 500);
  };

  const calculateAge = () => {
    if (!baby.dob) return null;
    const birthDate = new Date(baby.dob);
    const today = new Date();
    const ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + 
                        (today.getMonth() - birthDate.getMonth());
    
    if (ageInMonths < 1) {
      const days = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
      return `${days} days old`;
    } else if (ageInMonths < 12) {
      return `${ageInMonths} months old`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      const months = ageInMonths % 12;
      return `${years} year${years > 1 ? 's' : ''} ${months > 0 ? ` and ${months} month${months !== 1 ? 's' : ''}` : ''} old`;
    }
  };

  return (
    <div className="baby-profile-container">
      <BackButton />
      <h2 className="title">Baby Profile</h2>

      <div className="baby-photo">
        {baby.photo ? (
          <img src={baby.photo} alt="Baby" className="baby-img" />
        ) : (
          <div className="placeholder-pic">No Photo</div>
        )}

        <div className="photo-actions">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="fileInput"
          />
          <label htmlFor="fileInput" className="btn btn-secondary">
            {baby.photo ? "Change Photo" : "Upload Photo"}
          </label>
          {baby.photo && (
            <button className="btn remove-btn" onClick={handleRemovePhoto}>
              Remove Photo
            </button>
          )}
        </div>
      </div>

      <div className="form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            className="input"
            placeholder="Enter baby's full name"
            value={baby.fullName}
            onChange={handleChange}
            required
          />
          {errors.fullName && (
            <span className="error-message">{errors.fullName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth *</label>
          <input
            id="dob"
            type="date"
            name="dob"
            className="input"
            value={baby.dob}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            required
          />
          {errors.dob && (
            <span className="error-message">{errors.dob}</span>
          )}
          {baby.dob && !errors.dob && (
            <span className="info-text">{calculateAge()}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            className="select"
            value={baby.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="input-group">
          <div className="form-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              id="weight"
              type="number"
              name="weight"
              className="input"
              placeholder="e.g., 3.5"
              value={baby.weight}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="50"
            />
            {errors.weight && (
              <span className="error-message">{errors.weight}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="height">Height (cm)</label>
            <input
              id="height"
              type="number"
              name="height"
              className="input"
              placeholder="e.g., 50"
              value={baby.height}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="200"
            />
            {errors.height && (
              <span className="error-message">{errors.height}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            className="input"
            placeholder="Any allergies, health information, or other important notes..."
            value={baby.notes}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>

        <button 
          className="btn save-btn" 
          onClick={handleSave}
          disabled={isSaving || Object.keys(errors).length > 0}
        >
          {isSaving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}

export default BabyProfile;