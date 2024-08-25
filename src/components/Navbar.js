import React from 'react';
import './Navbar.css';

const Navbar = () => {

  const reloadPage = () => {
    window.location.reload()
  }
  return (
    <nav className="navbar">
      <div className="navbar-logo">CNAPP Dashboard</div>
      <div className="navbar-buttons">
        <button className="navbar-add-widget">
          Add Widget +
        </button>
        <button onClick={reloadPage} className="navbar-reload">
          ↻
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
