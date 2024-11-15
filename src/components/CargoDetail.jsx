import React from 'react';

function CargoDetail({ cargo }) {
  return (
    <div className="cargo-detail">
      <h2>{cargo.name}</h2>
      <p>Status: {cargo.status}</p>
      <p>Damage: {cargo.damage ? 'Yes' : 'No'}</p>
      <p>Description: {cargo.description}</p>
    </div>
  );
}

export default CargoDetail;
