// components/CargoForm.jsx

import React, { useState, useEffect } from 'react';
import "../App.css"; 

function CargoForm({ onAddCargo, onUpdateCargo, cargoToUpdate }) {
  const [cargo, setCargo] = useState({ name: '', status: '', damage: false });
  const [error, setError] = useState('');

  useEffect(() => {
    if (cargoToUpdate) {
      setCargo(cargoToUpdate);
    }
  }, [cargoToUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cargo.name || !cargo.status) {
      setError('Please provide both name and status for the cargo.');
      return;
    }

    if (cargoToUpdate) {
      onUpdateCargo(cargo.id, cargo);
    } else {
      onAddCargo(cargo);
    }

    setCargo({ name: '', status: '', damage: false });
  };

  return (
    <form onSubmit={handleSubmit}>
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
      {error && <p className="error">{error}</p>}
      <button type="submit">{cargoToUpdate ? 'Update Cargo' : 'Add Cargo'}</button>
    </form>
  );
}

export default CargoForm;
