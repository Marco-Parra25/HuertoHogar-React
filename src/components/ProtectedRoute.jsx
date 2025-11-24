// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Usuario autenticado pero sin permisos
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
