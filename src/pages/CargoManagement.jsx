// pages/CargoManagement.jsx

import React, { useState, useEffect } from 'react';
import CargoForm from '../components/CargoForm'; 
import CargoList from '../components/CargoList'; 
import Search from '../components/Search'; 
import { getCargo, addCargo, deleteCargo, updateCargo, searchCargo } from '../services/api';
import "../App.css"; 
function CargoManagement() {
  const [cargoData, setCargoData] = useState([]); // All cargo items
  const [editingCargo, setEditingCargo] = useState(null); // For editing a cargo item
  const [searchResults, setSearchResults] = useState([]); // For holding search results

  // Fetch cargo data on initial load
  useEffect(() => {
    fetchCargoData();
  }, []);

  const fetchCargoData = async () => {
    try {
      const data = await getCargo();
      setCargoData(data);
      setSearchResults(data); // Initially, search results are the same as cargo data
    } catch (error) {
      console.error('Error fetching cargo data:', error);
    }
  };

  // Handle adding new cargo
  const handleAddCargo = async (cargo) => {
    try {
      const newCargo = await addCargo(cargo);
      setCargoData([...cargoData, newCargo]);
      setSearchResults([...cargoData, newCargo]); // Add to search results as well
    } catch (error) {
      console.error('Error adding cargo:', error);
    }
  };

  // Handle deleting a cargo item
  const handleDeleteCargo = async (id) => {
    try {
      await deleteCargo(id);
      const updatedCargoData = cargoData.filter((cargo) => cargo.id !== id);
      setCargoData(updatedCargoData);
      setSearchResults(updatedCargoData); // Update search results after deletion
    } catch (error) {
      console.error('Error deleting cargo:', error);
    }
  };

  // Handle editing a cargo item
  const handleEditCargo = (cargo) => {
    setEditingCargo(cargo); // Set the cargo to be edited in the form
  };

  // Handle updating a cargo item
  const handleUpdateCargo = async (id, updatedCargo) => {
    try {
      const updatedItem = await updateCargo(id, updatedCargo);
      const updatedCargoData = cargoData.map((cargo) =>
        cargo.id === id ? updatedItem : cargo
      );
      setCargoData(updatedCargoData);
      setSearchResults(updatedCargoData); // Update search results after update
      setEditingCargo(null); // Clear editing state after update
    } catch (error) {
      console.error('Error updating cargo:', error);
    }
  };

  // Handle search query
  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults(cargoData); // If no query, show all cargo
      return;
    }
    try {
      const results = await searchCargo(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching cargo:', error);
    }
  };

  return (
    <div className="cargo-management">
      <h1>Cargo Management</h1>

      {/* Search Component */}
      <Search onSearchResults={handleSearch} />

      {/* Cargo Form */}
      <CargoForm 
        onAddCargo={handleAddCargo} 
        onUpdateCargo={handleUpdateCargo}
        cargoToUpdate={editingCargo} // Passing editingCargo to pre-fill the form
      />

      {/* Cargo List */}
      <CargoList
        cargoData={searchResults} // Use search results for filtering
        onDeleteCargo={handleDeleteCargo}
        onEditCargo={handleEditCargo}
      />
    </div>
  );
}

export default CargoManagement;
