import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Cargo Management</h2>
      </div>
      <ul className="navbar-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/cargo-management">Manage Cargo</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
