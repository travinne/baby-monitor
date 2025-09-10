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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBaby({ ...baby, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBaby({ ...baby, photo: imageUrl });
    }
  };

  const handleRemovePhoto = () => {
    setBaby({ ...baby, photo: "" });
  };

  const handleSave = () => {
    localStorage.setItem("baby", JSON.stringify(baby));
    alert("Baby profile updated successfully!");
  };

  return (
    <div className="baby-profile-container">
      <BackButton />
      <h2>Baby Profile</h2>

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
          <label htmlFor="fileInput" className="btn">
            {baby.photo ? "Change Photo" : "Upload Photo"}
          </label>
          {baby.photo && (
            <button className="btn remove-btn" onClick={handleRemovePhoto}>
              Remove Photo
            </button>
          )}
        </div>
      </div>

      <div className="baby-info">
        <input
          type="text"
          name="fullName"
          placeholder="Baby's Full Name"
          value={baby.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="dob"
          value={baby.dob}
          onChange={handleChange}
          required
        />

        <select
          name="gender"
          value={baby.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>

        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={baby.weight}
          onChange={handleChange}
        />

        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          value={baby.height}
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Additional notes (allergies, health info, etc.)"
          value={baby.notes}
          onChange={handleChange}
        ></textarea>

        <button className="save-btn" onClick={handleSave}>
          Save Profile
        </button>
      </div>
    </div>
  );
}

export default BabyProfile;
