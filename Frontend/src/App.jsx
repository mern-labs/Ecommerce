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
import FilterProducts from "./pages/FilterProducts"
import Category from "./layouts/Category"
import Checkout from "./pages/Checkout"

const App = () => {
  return (
    <BrowserRouter>
      <ProviderContext>
        <Routes>

          {/* Public pages with Navbar */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products/filter" element={<FilterProducts />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/shop" element={<Category />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/addtocard" element={<Addtocard />} />
            <Route path="/checkout" element={<Checkout />} />
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
