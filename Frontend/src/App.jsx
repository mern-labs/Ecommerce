import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProviderContext } from "./context/Usecontext"

import Home from "./pages/Home"
import Login from "./common/Login"
import Register from "./common/Register"

import ProtectedRoute from "./routes/ProtectedRoute"
import MainLayout from "./layouts/MainLayout"

const App = () => {
  return (
    <BrowserRouter>
      <ProviderContext>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ✅ Protected + Navbar */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Route>

        </Routes>
      </ProviderContext>
    </BrowserRouter>
  )
}

export default App
