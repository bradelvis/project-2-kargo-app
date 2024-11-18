import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar component
import Footer from './components/Footer'; // Import Footer component
import CargoList from './components/CargoList'; // Import CargoList component
import CargoForm from './components/CargoForm'; // Import CargoForm component
import Search from './components/Search'; // Import Search component
import Home from './pages/Home'; // Home page
import About from './pages/About'; // About page
import CargoManagement from './pages/CargoManagement';
import { getCargo, addCargo, deleteCargo, updateCargo } from './services/api'; // API functions
import "./App.css"; // for files in the same directory


function App() {
  const [cargoData, setCargoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search state to filter cargos


  // Fetch cargo data on mount
  useEffect(() => {
    getCargo().then((data) => setCargoData(data)).catch((err) => console.error('Error loading cargo data:', err));
  }, []);

  // Handle adding cargo
  const handleAddCargo = (cargo) => {
    addCargo(cargo).then((newCargo) => {
      setCargoData((prevData) => [...prevData, newCargo]);
    }).catch((err) => console.error('Error adding cargo:', err));
  };

  // Handle deleting cargo
  const handleDeleteCargo = (id) => {
    deleteCargo(id).then(() => {
      setCargoData((prevData) => prevData.filter((cargo) => cargo.id !== id));
    }).catch((err) => console.error('Error deleting cargo:', err));
  };

  // Handle updating cargo details
  const handleUpdateCargo = (id, updatedCargo) => {
    updateCargo(id, updatedCargo).then((updated) => {
      setCargoData((prevData) =>
        prevData.map((cargo) => (cargo.id === id ? updated : cargo))
      );
    }).catch((err) => console.error('Error updating cargo:', err));
  };
 // Handle search input change
 const handleSearchChange = (term) => {
  setSearchTerm(term);
};
  // Filter cargos based on search term
  const filteredCargos = cargoData.filter(cargo => 
    cargo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Routes>
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
            <Route path="/search" element={<Search />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
