import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { isLogged, authLoading } = useContext(AppContent);
  if (authLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
