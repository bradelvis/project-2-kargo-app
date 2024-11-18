import React, { useState, useEffect } from 'react';
import './index.css';  // Import your global styles
import ReactDOM from 'react-dom';

// API base URL
const API_URL = 'https://project-2-kargo-app-2.onrender.com/cargo';  // Update with your actual backend API URL

// Main Component for CRUD Operations
const CargoApp = () => {
  const [cargoList, setCargoList] = useState([]);
  const [newCargo, setNewCargo] = useState({
    name: '',
    category: '',
    description: '',
    weight: '',
    status: '',
  });
  const [editCargo, setEditCargo] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Fetch Cargo List
  useEffect(() => {
    const fetchCargo = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCargoList(data);
      } catch (error) {
        console.error('Error fetching cargo:', error);
      }
    };
    fetchCargo();
  }, []);

  // Add Cargo (Create)
  const handleAddCargo = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCargo),
      });
      const addedCargo = await response.json();
      setCargoList([...cargoList, addedCargo]);
      setNewCargo({
        name: '',
        category: '',
        description: '',
        weight: '',
        status: '',
      });
    } catch (error) {
      console.error('Error adding cargo:', error);
    }
  };

  // Delete Cargo (Delete)
  const handleDeleteCargo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      setCargoList(cargoList.filter((cargo) => cargo.id !== id));
    } catch (error) {
      console.error('Error deleting cargo:', error);
    }
  };

  // Edit Cargo (Update)
  const handleEditCargo = async (id) => {
    const cargoToEdit = cargoList.find((cargo) => cargo.id === id);
    setEditCargo(cargoToEdit);
  };

  const handleUpdateCargo = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/${editCargo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editCargo),
      });
      const updatedCargo = await response.json();
      setCargoList(cargoList.map((cargo) => (cargo.id === updatedCargo.id ? updatedCargo : cargo)));
      setEditCargo(null);  // Reset edit form
    } catch (error) {
      console.error('Error updating cargo:', error);
    }
  };

  // Handling input changes
  const handleInputChange = (e, field) => {
    const { value } = e.target;
    if (editCargo) {
      setEditCargo({ ...editCargo, [field]: value });
    } else {
      setNewCargo({ ...newCargo, [field]: value });
    }
  };

  // Dropdown Toggle
  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="container">
      <h1>Kar-go Cargo Management</h1>

      {/* Dropdown Button */}
      <div className="dropdown">
        <button className="dropdown-button" onClick={handleDropdownToggle}>
          Options
        </button>
        {dropdownVisible && (
          <div className="dropdown-menu">
            <a href="#">Profile</a>
            <a href="#">Settings</a>
            <a href="#">Logout</a>
          </div>
        )}
      </div>

      {/* Cargo Form for Adding or Editing Cargo */}
      <div className="cargo-form">
        <h2>{editCargo ? 'Edit Cargo' : 'Add New Cargo'}</h2>
        <form onSubmit={editCargo ? handleUpdateCargo : handleAddCargo}>
          <input
            type="text"
            placeholder="Cargo Name"
            value={editCargo ? editCargo.name : newCargo.name}
            onChange={(e) => handleInputChange(e, 'name')}
          />
          <input
            type="text"
            placeholder="Category"
            value={editCargo ? editCargo.category : newCargo.category}
            onChange={(e) => handleInputChange(e, 'category')}
          />
          <textarea
            placeholder="Description"
            value={editCargo ? editCargo.description : newCargo.description}
            onChange={(e) => handleInputChange(e, 'description')}
          />
          <input
            type="text"
            placeholder="Weight"
            value={editCargo ? editCargo.weight : newCargo.weight}
            onChange={(e) => handleInputChange(e, 'weight')}
          />
          <input
            type="text"
            placeholder="Status"
            value={editCargo ? editCargo.status : newCargo.status}
            onChange={(e) => handleInputChange(e, 'status')}
          />
          <button type="submit">{editCargo ? 'Update Cargo' : 'Add Cargo'}</button>
        </form>
      </div>

      {/* Display Cargo List */}
      <div className="cargo-list">
        <h2>Cargo List</h2>
        <div className="cargo-cards">
          {cargoList.map((cargo) => (
            <div className="cargo-card" key={cargo.id}>
              <img src="path-to-image.jpg" alt="Cargo" />
              <div className="cargo-details">
                <div className="cargo-category">Category: {cargo.category}</div>
                <div className="cargo-name">{cargo.name}</div>
                <div className="cargo-description">{cargo.description}</div>
                <div className="cargo-weight">Weight: {cargo.weight} kg</div>
                <div className="cargo-status">Status: {cargo.status}</div>
                <button onClick={() => handleEditCargo(cargo.id)}>Edit</button>
                <button onClick={() => handleDeleteCargo(cargo.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Render CargoApp component into the root div
ReactDOM.render(
  <React.StrictMode>
    <CargoApp />
  </React.StrictMode>,
  document.getElementById('root')
);
