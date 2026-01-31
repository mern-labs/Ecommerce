import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProviderContext } from "./context/Usecontext";

import Home from "./pages/Home";
import Login from "./common/Login";
import Register from "./common/Register";

import MainLayout from "./layouts/MainLayout";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import Addtocard from "./pages/Addtocard";
import ProductDetails from "./pages/ProductDetails";
<<<<<<< HEAD
import About from "./pages/About"
import AboutSection from "./pages/About"
=======
import FilterProducts from "./pages/FilterProducts";
import Category from "./layouts/Category";
import Checkout from "./pages/Checkout";

// Admin pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminSettings from "./pages/Admin/AdminSettings";
import AddProduct from "./pages/AddProduct";
>>>>>>> 9384b0bbe7ba30868f09db9702b67c6ab06fe129

const App = () => {
  return (
    <BrowserRouter>
      <ProviderContext>
        <Routes>

          {/* Public pages with layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
<<<<<<< HEAD
            <Route path="/about" element={<AboutSection />} />
=======
            <Route path="/products" element={<Products />} />
            <Route path="/products/filter" element={<FilterProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/shop" element={<Category />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/addtocard" element={<Addtocard />} />
            <Route path="/checkout" element={<Checkout />} />
>>>>>>> 9384b0bbe7ba30868f09db9702b67c6ab06fe129
          </Route>

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

        </Routes>
      </ProviderContext>
    </BrowserRouter>
  );
};

export default App;