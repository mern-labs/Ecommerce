import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProviderContext } from "./context/Usecontext"

import Home from "./pages/Home"
import Login from "./common/Login"
import Register from "./common/Register"

import MainLayout from "./layouts/MainLayout"

const App = () => {
  return (
    <BrowserRouter>
      <ProviderContext>
        <Routes>

          {/* Public pages with Navbar */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Route>

          {/* Auth pages without Navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </ProviderContext>
    </BrowserRouter>
  )
}

export default App
