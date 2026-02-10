import { Navigate } from "react-router-dom";
import { useData } from "../context/Usecontext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useData();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
