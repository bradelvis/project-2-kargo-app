import React, { useState } from 'react';
import { addCargo } from "../services/api";  // Ensure this is correctly imported
import "../App.css";  // Going one directory up from /components to /src

function CargoForm({ setCargoData }) {
  const [cargo, setCargo] = useState({ name: '', status: '', damage: false });
  const [loading, setLoading] = useState(false); // For tracking submission state
  const [error, setError] = useState(''); // For handling errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cargo.name || !cargo.status) {
      setError('Please provide both name and status for the cargo.');
      return;
    }

    try {
      setLoading(true); // Start loading state while submitting
      const newCargo = await addCargo(cargo); // Assuming this returns the added cargo object
      setCargoData(prevData => [...prevData, newCargo]);
      setCargo({ name: '', status: '', damage: false }); // Reset form fields
      setError(''); // Clear error if submission is successful
    } catch (err) {
      setError('Failed to add cargo. Please try again later.');
      console.error('Error adding cargo:', err);
    } finally {
      setLoading(false); // End loading state after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="cargo-form">
      <input
        type="text"
        placeholder="Cargo Name"
        value={cargo.name}
        onChange={(e) => setCargo({ ...cargo, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Cargo Status"
        value={cargo.status}
        onChange={(e) => setCargo({ ...cargo, status: e.target.value })}
      />
      <label>
        Damaged:
        <input
          type="checkbox"
          checked={cargo.damage}
          onChange={(e) => setCargo({ ...cargo, damage: e.target.checked })}
        />
      </label>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      <button type="submit" disabled={loading}>
        {loading ? 'Adding Cargo...' : 'Add Cargo'}
      </button>
    </form>
  );
}

export default CargoForm;
