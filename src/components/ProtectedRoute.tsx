import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = token !== null && token !== '';

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;