import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import for React Router v6
import Navbar from './components/Navbar'; // Importing Navbar
import Footer from './components/Footer'; // Importing Footer
import CargoList from './components/CargoList'; // Importing CargoList
import CargoForm from './components/CargoForm'; // Importing CargoForm
import Home from './pages/Home'; // Home page
import About from './pages/About'; // About page
import { getCargo, addCargo, deleteCargo, updateCargo } from './services/api';  // Import all necessary API functions
import './App.css';  // Adjusted path for App.css inside the src folder

function App() {
  const [cargoData, setCargoData] = useState([]);

  // Fetch cargo data on mount
  useEffect(() => {
    getCargo().then((data) => setCargoData(data));
  }, []);

  // Handle adding cargo
  const handleAddCargo = (cargo) => {
    addCargo(cargo).then((newCargo) => {
      setCargoData((prevData) => [...prevData, newCargo]);
    });
  };

  // Handle deleting cargo
  const handleDeleteCargo = (id) => {
    deleteCargo(id).then(() => {
      setCargoData((prevData) => prevData.filter((cargo) => cargo.id !== id));
    });
  };

  // Handle updating cargo details
  const handleUpdateCargo = (updatedCargo) => {
    updateCargo(updatedCargo).then(() => {
      setCargoData((prevData) =>
        prevData.map((cargo) =>
          cargo.id === updatedCargo.id ? updatedCargo : cargo
        )
      );
    });
  };

  return (
    <Router>
      <div className="app">
        <Navbar />  {/* Navigation bar */}

        {/* Main content */}
        <div className="main-content">
          <Routes>
            {/* Routes for different pages */}
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cargo-management" element={
              <>
                <h1>Cargo Management</h1>
                <CargoForm onAddCargo={handleAddCargo} />
                <CargoList
                  cargoData={cargoData}
                  onDeleteCargo={handleDeleteCargo}
                  onUpdateCargo={handleUpdateCargo}
                />
              </>
            } />
            {/* Default Route */}
            <Route path="/" element={<Home />} />
          </Routes>
        </div>

        <Footer />  {/* Footer */}
      </div>
    </Router>
  );
}

export default App;
