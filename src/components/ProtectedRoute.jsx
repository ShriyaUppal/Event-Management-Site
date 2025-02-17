import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowGuest = false }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;
  if (user.role === "guest" && !allowGuest) return <Navigate to="/dashboard" />;

  return children;
};

export default ProtectedRoute;
