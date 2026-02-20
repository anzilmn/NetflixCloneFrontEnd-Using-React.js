import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // If no user, redirect them to the login page
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;