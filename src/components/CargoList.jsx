import React, { useState } from 'react';

function CargoList({ cargoData, onDeleteCargo, onUpdateCargo }) {
  const [editingCargo, setEditingCargo] = useState(null); // Track the cargo being edited
  const [updatedCargo, setUpdatedCargo] = useState({ id: null, name: '', status: '', damage: false });
  const [searchTerm, setSearchTerm] = useState(''); // Track the search input

  // Handle editing cargo
  const handleEditClick = (cargo) => {
    setEditingCargo(cargo.id); // Track only the id for editing mode
    setUpdatedCargo({ ...cargo }); // Pre-fill the form with the current cargo data
  };

  // Handle updating cargo
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (updatedCargo.name && updatedCargo.status) {
      onUpdateCargo(updatedCargo); // Pass updated cargo data to parent
      setEditingCargo(null); // Clear editing mode
      setUpdatedCargo({ id: null, name: '', status: '', damage: false }); // Reset form
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter the cargo data based on the search term
  const filteredCargoData = cargoData.filter(
    (cargo) =>
      cargo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cargo.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cargo-list">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search cargo..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* List of cargo items */}
      {filteredCargoData.length > 0 ? (
        filteredCargoData.map((cargo) => (
          <div key={cargo.id} className="cargo-item">
            <span>{cargo.name} ({cargo.status})</span>
            <button onClick={() => onDeleteCargo(cargo.id)}>Delete</button>
            <button onClick={() => handleEditClick(cargo)}>Edit</button>

            {editingCargo === cargo.id && (
              <div>
                <form onSubmit={handleUpdateSubmit}>
                  <div>
                    <label>Name:</label>
                    <input
                      type="text"
                      value={updatedCargo.name}
                      onChange={(e) => setUpdatedCargo({ ...updatedCargo, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>Status:</label>
                    <input
                      type="text"
                      value={updatedCargo.status}
                      onChange={(e) => setUpdatedCargo({ ...updatedCargo, status: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>
                      Damaged:
                      <input
                        type="checkbox"
                        checked={updatedCargo.damage}
                        onChange={(e) => setUpdatedCargo({ ...updatedCargo, damage: e.target.checked })}
                      />
                    </label>
                  </div>
                  <button type="submit">Update Cargo</button>
                </form>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No cargo available.</p>
      )}
    </div>
  );
}

export default CargoList;
