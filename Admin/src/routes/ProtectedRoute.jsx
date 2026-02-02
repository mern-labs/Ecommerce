import { Navigate } from "react-router-dom";
import { useAdminData } from "../context/AdminContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAdminData();

  // ⏳ Wait until user is loaded from localStorage
  if (loading) return null; // or loader/spinner

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Not admin
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  // ✅ Allowed
  return children;
};

export default ProtectedRoute;