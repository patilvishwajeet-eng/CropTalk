import React from "react";
import { Navigate } from "react-router-dom"; // For redirecting
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useUser(); // Get the logged-in user

  return user ? (
    <Component {...rest} /> // If user is authenticated, render the component
  ) : (
    <Navigate to="/signin" replace /> // If not authenticated, redirect to sign-in
  );
};

export default ProtectedRoute;
