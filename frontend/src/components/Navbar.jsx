import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Navbar = () => {

  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    await fetch(`${API_BASE_URL}/auth/logout`, {
      credentials: "include",
    });
    logout();
    alert("Logged out successfully");
    navigate("/listings");
  };

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
          {!isLoggedIn && (
            <>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/listings/signup">
              Signup
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/listings/login">
              Login
            </NavLink>
          </li>
          </>
          )}
          {isLoggedIn && (
            <li className="nav-item">
              <button className="nav-link btn btn-link text-white" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;