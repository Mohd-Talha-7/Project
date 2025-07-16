import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg px-4 sticky-top">
      <NavLink className="navbar-brand text-white" to="/">
        MyApp
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/listings">
              All Listings
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/listings/new">
              Add New Listing
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
