import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getAllOrders, getProducts, getContactMessage, getUsers } from "../interceptor/interceptor";

const AdminDataContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing user:", err);
        localStorage.removeItem("user");
      }
    }
    setUserLoading(false);
  }, []);

  // Fetch users function
  const fetchUsers = useCallback(async () => {
    if (!user) return;
    
    try {
      setUsersLoading(true);
      const res = await getUsers();
      setUsers(res?.data || []);
    } catch (err) {
      console.error("Users fetch error:", err.message);
    } finally {
      setUsersLoading(false);
    }
  }, [user]);

  // Fetch products function
  const fetchProducts = useCallback(async () => {
    if (!user) return;
    
    try {
      setProductsLoading(true);
      const res = await getProducts();
      setProducts(res?.data?.products || res?.data?.data || []);
    } catch (err) {
      console.error("Product fetch error:", err.message);
    } finally {
      setProductsLoading(false);
    }
  }, [user]);

  // Fetch orders function
  const fetchOrders = useCallback(async () => {
    if (!user || user.role !== "admin") return;
    
    try {
      setOrdersLoading(true);
      const res = await getAllOrders();
      setOrders(res?.data?.orders || []);
    } catch (err) {
      console.error("Orders fetch error:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setOrdersLoading(false);
    }
  }, [user]);

  // Fetch messages function
  const fetchMessages = useCallback(async () => {
    if (!user) return;
    
    try {
      setMessageLoading(true);
      const response = await getContactMessage();
      setMessages(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error("Messages fetch error:", err);
      setError("Failed to load messages");
    } finally {
      setMessageLoading(false);
    }
  }, [user]);

  // Initial data fetch when user is loaded
  useEffect(() => {
    if (!user) return;

    // Fetch all data in parallel
    Promise.all([
      fetchUsers(),
      fetchProducts(),
      fetchOrders(),
      fetchMessages()
    ]);
  }, [user, fetchUsers, fetchProducts, fetchOrders, fetchMessages]);

  // Login
  const login = useCallback((data) => {
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    setUser(data);
  }, []);

  // Logout
  const logout = useCallback(() => {
    localStorage.clear();
    setUser(null);
    setOrders([]);
    setMessages([]);
    setProducts([]);
    setUsers([]);
    setError(null);
  }, []);

  // Refetch messages
  const refetchMessages = useCallback(async () => {
    await fetchMessages();
  }, [fetchMessages]);

  return (
    <AdminDataContext.Provider
      value={{
        user,
        orders,
        products,
        messages,
        users,
        userLoading,
        ordersLoading,
        messageLoading,
        productsLoading,
        usersLoading,
        error,
        login,
        logout,
        setMessages,
        setUsers,
        fetchUsers,
        fetchProducts,
        fetchOrders,
        refetchMessages,
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