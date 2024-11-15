import React from 'react';
import { addCargo } from "../services/api";
import "../App.css";  // Going one directory up from /components to /src


function CargoItem({ cargo, setCargoData }) {
  const handleDelete = () => {
    deleteCargo(cargo.id).then(() => {
      setCargoData(prevData => prevData.filter(item => item.id !== cargo.id));
    });
  };

  const handleUpdate = () => {
    const updatedCargo = { ...cargo, status: 'Updated' }; // Example update
    updateCargo(cargo.id, updatedCargo).then(() => {
      setCargoData(prevData => prevData.map(item => (item.id === cargo.id ? updatedCargo : item)));
    });
  };

  return (
    <div className="cargo-item">
      <h3>{cargo.name}</h3>
      <p>Status: {cargo.status}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default CargoItem;
