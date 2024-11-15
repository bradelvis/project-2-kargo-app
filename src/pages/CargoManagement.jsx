import React, { useState, useEffect } from 'react';
import CargoForm from '../components/CargoForm'; // Import CargoForm
import CargoList from '../components/CargoList'; // Import CargoList

function CargoManagement() {
  const [cargoData, setCargoData] = useState([]); // State to store cargo data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state

  // Fetch cargo data when the component mounts
  useEffect(() => {
    const fetchCargoData = async () => {
      try {
        const response = await fetch('http://localhost:5000/cargos'); // Fetch cargo list from db.json (assuming json-server is running)
        const data = await response.json();
        setCargoData(data); // Update state with fetched data
      } catch (err) {
        setError('Failed to fetch cargo data. Please try again later.');
        console.error('Error fetching cargo data:', err);
      } finally {
        setLoading(false); // End loading state after fetch
      }
    };

    fetchCargoData();
  }, []);

  // Handle adding cargo (onAddCargo)
  const onAddCargo = async (cargo) => {
    try {
      const response = await fetch('http://localhost:5000/cargos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cargo),
      });

      const newCargo = await response.json(); // Assuming the response contains the newly added cargo
      setCargoData((prevData) => [...prevData, newCargo]); // Update state with new cargo
    } catch (err) {
      setError('Failed to add cargo. Please try again later.');
      console.error('Error adding cargo:', err);
    }
  };

  // Handle deleting cargo (onDeleteCargo)
  const onDeleteCargo = async (cargoId) => {
    try {
      const response = await fetch(`http://localhost:5000/cargos/${cargoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // After successful deletion, filter the cargo from the state
        setCargoData((prevData) => prevData.filter((cargo) => cargo.id !== cargoId));
      } else {
        throw new Error('Failed to delete cargo');
      }
    } catch (err) {
      setError('Failed to delete cargo. Please try again later.');
      console.error('Error deleting cargo:', err);
    }
  };

  // Handle updating cargo (onUpdateCargo)
  const onUpdateCargo = async (updatedCargo) => {
    try {
      const response = await fetch(`http://localhost:5000/cargos/${updatedCargo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCargo),
      });

      if (response.ok) {
        const updatedCargoData = await response.json();
        setCargoData((prevData) =>
          prevData.map((cargo) =>
            cargo.id === updatedCargoData.id ? updatedCargoData : cargo
          )
        );
      } else {
        throw new Error('Failed to update cargo');
      }
    } catch (err) {
      setError('Failed to update cargo. Please try again later.');
      console.error('Error updating cargo:', err);
    }
  };

  return (
    <div className="cargo-management">
      <h1>Manage Cargo</h1>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <p>Loading cargo data...</p>
      ) : (
        <>
          <CargoForm onAddCargo={onAddCargo} />
          <CargoList
            cargoData={cargoData}
            onDeleteCargo={onDeleteCargo}
            onUpdateCargo={onUpdateCargo}
          />
        </>
      )}
    </div>
  );
}

export default CargoManagement;
