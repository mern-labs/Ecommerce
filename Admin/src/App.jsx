import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AdminProvider } from "./context/AdminContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// Auth pages
import Login from "./common/Login";
import Register from "./common/Register";

// Admin pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminSettings from "./pages/AdminSettings";
import AddProduct from "./pages/AddProduct";

import { ToastContainer } from "react-toastify";
import AdminMessages from "./pages/AdminMessages";

const App = () => {
  return (
    <BrowserRouter>
      <AdminProvider>
        <Routes>

          {/* ================= DEFAULT ================= */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* ================= AUTH ================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ================= ADMIN ================= */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute adminOnly>
                <AdminUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <ProtectedRoute adminOnly>
                <AdminProducts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products/add"
            element={
              <ProtectedRoute adminOnly>
                <AddProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute adminOnly>
                <AdminOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute adminOnly>
                <AdminSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute adminOnly>
                <AdminMessages />
              </ProtectedRoute>
            }
          />

        </Routes>

        <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      </AdminProvider>
    </BrowserRouter>
  );
};


export default App;