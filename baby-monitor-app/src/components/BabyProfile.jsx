import React, {useState} from "react";

function BabyProfile(){
    const [baby ,setBaby]
 = useState({
    name:"",
    dob:"",
    gender:"",
    wieght:"",
    height:"",
    photo:"",
 });

 const handleChange = (e) => {const {name, value, files} = e.target;
 if (name === 'photo') {
    setBaby({...baby, photo:URL.createObjectURL(files[0]) })} else {setBaby({...baby, [name]:value });
 }
 };

 const saveProfile = () => {
    alert("Baby profile saved!");
    console.log(baby);
 };

 return (
    <div className="baby">
        <h2 className="baby-profile">Baby Profile </h2>

      {baby.photo && (
        <img
          src={baby.photo}
          alt="Baby"
          className="baby-photo"
        />
      )}
      <input type="file"
     name="photo"
     onChange={handleChange} 
    className="baby.photo"
    />

      <input
      type = 'text'
      name = 'name'
      placeholder="Baby`s Name"
      value = {baby.name}
      onChange = {handleChange}
      className="baby.name"
      />

      <input
      type = 'date'
      name = 'dob'
      value = {baby.bob}
      onChange = {handleChange}
      className="baby.dob"
      />

      <select
      name = 'gender'
      value = {baby.gender}
      onChange={handleChange}
      className="baby.gender">
        <option value="">Select Gender</option>
        <option value="Boy">Boy</option>
        <option value="Girl">Girl</option>
      </select>
      <input
        type="number"
        name="weight"
        placeholder="Weight (kg)"
        value={baby.wieght}
        onChange={handleChange}
        className="baby.weight"
      />
      <input
        type="number"
        name="height"
        placeholder="Height (cm)"
        value={baby.height}
        onChange={handleChange}
        className="baby.height"
      />

      <button
        onClick={saveProfile}
        className="baby.profile"
      >
        Save Profile
      </button>
    </div>
  );
}

export default BabyProfile;
