// components/CargoItem.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css"; 

function CargoItem({ cargo, onDeleteCargo, onEditCargo }) {
  const handleDelete = () => {
    onDeleteCargo(cargo.id);
  };

  const handleEdit = () => {
    onEditCargo(cargo);
  };

  return (
    <div className="cargo-item">
      <h3>{cargo.name}</h3>
      <p>Status: {cargo.status}</p>
      <p>Damaged: {cargo.damage ? 'Yes' : 'No'}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleEdit}>
        <Link to={`/cargo-details/${cargo.id}`}>Edit</Link>
      </button>
    </div>
  );
}

export default CargoItem;
