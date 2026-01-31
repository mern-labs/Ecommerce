import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ProviderContext } from "./context/Usecontext"

import Home from "./pages/Home"
import Login from "./common/Login"
import Register from "./common/Register"

import MainLayout from "./layouts/MainLayout"
import Products from "./pages/Products"
import Wishlist from "./pages/Wishlist"
import Addtocard from "./pages/Addtocard"
import ProductDetails from "./pages/ProductDetails";
// import AdminPanel from "./pages/Admin/AdminPanel"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import AdminUsers from "./pages/Admin/AdminUsers"
import AdminProducts from "./pages/Admin/AdminProducts"
import AdminOrders from "./pages/Admin/AdminOrders"
import AdminSettings from "./pages/Admin/AdminSettings"
import AddProduct from "./pages/AddProduct"

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

          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace/>}/>

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* <Route path="/admin" element={<AdminPanel />} /> */}
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          {/* <Route path="/admin" element={<Navigate to="/admin/products/add" />}/> */}
          {/* <Route path="/admin/products/add" element={<AddProduct />} /> */}
        </Routes>
      </ProviderContext>
    </BrowserRouter>
  )
}

export default App



