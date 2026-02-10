import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProviderContext } from "./context/Usecontext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./common/Login";
import Register from "./common/Register";

import MainLayout from "./layouts/MainLayout";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import Addtocard from "./pages/Addtocard";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";

import FilterProducts from "./pages/FilterProducts";
import Category from "./layouts/Category";
import Checkout from "./pages/Checkout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import FooterLayout from "./layouts/footerLayout";

const App = () => {
  return (
    <ProviderContext>
      <BrowserRouter>
        <Routes>
          {/* ================= PUBLIC + MAIN LAYOUT ================= */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/home" />} />

            <Route element={<FooterLayout />}>
              <Route path="/home" element={<Home />} />
            </Route>

            <Route element={<FooterLayout />}>
              <Route path="/about" element={<About />} />
            </Route>

            <Route element={<FooterLayout />}>
              <Route path="/contact" element={<Contact />} />
            </Route>

            <Route path="/products" element={<Products />} />
            <Route path="/products/filter" element={<FilterProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/shop" element={<Category />} />

            {/* -------- USER PROTECTED -------- */}
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
            />

            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />

            <Route
              path="/addtocard"
              element={
                <ProtectedRoute>
                  <Addtocard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* ================= AUTH ================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          className="mt-16 sm:mt-16 md:mt-18 lg:mt-20 mr-4 sm:mr-5 md:mr-6 lg:mr-8 z-99999"
          toastClassName="mb-2 rounded-xl shadow-2xl font-medium text-sm sm:text-base backdrop-blur-sm"
          bodyClassName="p-4"
          progressClassName="h-1 bg-gradient-to-r from-pink-400 to-purple-400"
        />
      </BrowserRouter>
    </ProviderContext>
  );
};

export default App;