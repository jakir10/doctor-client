import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Prescription = () => {
  const location = useLocation();
  const patientName = new URLSearchParams(location.search).get("patientName");
  const [medication, setMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
  });

  useEffect(() => {
    // Do something when patientName changes
    console.log(`Patient name changed to: ${patientName}`);
  }, [patientName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // code to submit prescription data to server or API
    console.log(`Prescription submitted for ${patientName}:`, medication);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedication({ ...medication, [name]: value });
  };

  return (
    <div>
      <h2>
        Prescription for <span className="font-bold">{patientName}</span>
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Medication name:
          <input
            type="text"
            name="name"
            value={medication.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Dosage:
          <input
            type="text"
            name="dosage"
            value={medication.dosage}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Frequency:
          <input
            type="text"
            name="frequency"
            value={medication.frequency}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Duration:
          <input
            type="text"
            name="duration"
            value={medication.duration}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Prescription;
