import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token")

  // ⏳ Optional: prevent flash before auth loads
  if (token === null) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
