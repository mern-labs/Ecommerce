import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProviderContext } from "./context/Usecontext"

import Home from "./pages/Home"
import Login from "./common/Login"
import Register from "./common/Register"

import MainLayout from "./layouts/MainLayout"
import Products from "./pages/Products"
import Wishlist from "./pages/Wishlist"
import Addtocard from "./pages/Addtocard"
import ProductDetails from "./pages/ProductDetails";

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
          <Route path="/products" element={<Products />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/addtocard" element={<Addtocard />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </ProviderContext>
    </BrowserRouter>
  )
}

export default App
