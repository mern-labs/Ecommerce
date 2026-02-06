import { Navigate } from "react-router-dom";
import { useAdminData } from "../context/AdminContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, userLoading } = useAdminData();

  // ⏳ Wait until user is loaded from localStorage
  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Not admin
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // ✅ Allowed
  return children;
};

export default ProtectedRoute;