import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllOrders, getProducts, getContactMessage } from "../interceptor/interceptor";

const AdminDataContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setUserLoading(false);
  }, []);

  // Fetch all orders (ADMIN ONLY)
  useEffect(() => {
    if (!user) return;
    
    const fetchOrders = async () => {
      try {
        setOrdersLoading(true);
        const res = await getAllOrders();
        setOrders(res?.data?.orders || []);
        console.log("Admin context", res.data.orders);
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

  // Fetch products
  useEffect(() => {
    if (!user) return;
    
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res?.data?.products || res?.data?.data || []);
      } catch (err) {
        console.log("Product fetch error:", err.message);
      }
    };
    
    fetchProducts();
  }, [user]);

  // Fetch messages
  useEffect(() => {
    if (!user) return;
    
    const fetchMessages = async () => {
      try {
        setMessageLoading(true);
        const response = await getContactMessage();
        setMessages(response.data.data || []);
        setError(null);
      } catch (err) {
        setError("Failed to load messages");
        console.error("Error fetching messages:", err);
      } finally {
        setMessageLoading(false);
      }
    };
    
    fetchMessages();
  }, [user]);

  // Login
  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    setUser(data);
  };

  // Logout
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setOrders([]);
    setMessages([]);
    setProducts([]);
    setError(null);
  };

  return (
    <AdminDataContext.Provider
      value={{
        user,
        orders,
        products,
        messages,
        userLoading,
        ordersLoading,
        messageLoading,
        error,
        login,
        logout,
        setMessages, // Expose this for delete functionality
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

// Custom Hook
export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used inside AdminProvider");
  }
  return context;
};