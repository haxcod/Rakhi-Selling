// AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('admin_access') === 'true';
  return isAdmin ? children : <Navigate to={'/admin-auth'}/>;
};

export default AdminRoute;
