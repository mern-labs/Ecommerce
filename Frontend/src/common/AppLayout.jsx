// AppLayout.jsx
import React from "react"
import { useLocation } from "react-router-dom"
import Navbar from "./common/Navbar"

const AppLayout = ({ children }) => {
  const location = useLocation()

  // Hide Navbar on login and register
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register"

  return (
    <div>
      {!hideNavbar && <Navbar />}
      {children}
    </div>
  )
}

export default AppLayout
