// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    alert("You must be logged in to access this page.");
    return <Navigate to="/listings/login" />;
  }

  return children;
};

export default ProtectedRoute;
