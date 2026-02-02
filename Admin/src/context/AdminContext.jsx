import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllOrders } from "../interceptor/interceptor";

const AdminDataContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setUserLoading(false);
  }, []);

  // 🔹 Fetch all orders (ADMIN ONLY)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setOrdersLoading(true);
        const res = await getAllOrders();
        setOrders(res?.data?.orders || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setOrdersLoading(false);
      }
    };

    if (user?.role === "admin") {
      fetchOrders();
    }
  }, [user]);

  // 🔹 Login
  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    setUser(data);
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setOrders([]);
    setError(null);
  };

  return (
    <AdminDataContext.Provider
      value={{
        user,
        orders,
        userLoading,
        ordersLoading,
        loading: userLoading, // ✅ IMPORTANT
        error,
        login,
        logout,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

// 🔹 Custom Hook
export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used inside AdminProvider");
  }
  return context;
};