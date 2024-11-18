// components/CargoList.jsx

import React from 'react';
import CargoItem from './CargoItem';
import "../App.css"; 

function CargoList({ cargoData, onDeleteCargo, onEditCargo }) {
  return (
    <div className="cargo-list">
      {cargoData.length === 0 ? (
        <p>No cargo available.</p>
      ) : (
        cargoData.map((cargo) => (
          <CargoItem
            key={cargo.id}
            cargo={cargo}
            onDeleteCargo={onDeleteCargo}
            onEditCargo={onEditCargo}
          />
        ))
      )}
    </div>
  );
}

export default CargoList;
