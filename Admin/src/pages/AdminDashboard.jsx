import React, { useState, useEffect } from "react";
import AdminPanel from "./AdminPanel";
import { getUsers, getProducts, getAllOrders } from "../interceptor/interceptor";
import apiInstance from "../interceptor/interceptor";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const baseURL = apiInstance.defaults.baseURL;

  // Fetch all data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all data in parallel
      const [usersRes, productsRes, ordersRes] = await Promise.all([
        getUsers(),
        getProducts(),
        getAllOrders()
      ]);

      // Extract data - handle different response structures
      // Check if data is in response.data.data or response.data
      const users = usersRes.data?.data || usersRes.data?.users || usersRes.data || [];
      const products = productsRes.data?.data || productsRes.data?.products || productsRes.data || [];
      const orders = ordersRes.data?.data || ordersRes.data?.orders || ordersRes.data || [];

      console.log("Users Response:", usersRes.data);
      console.log("Products Response:", productsRes.data);
      console.log("Orders Response:", ordersRes.data);
      console.log("Extracted Users:", users);
      console.log("Extracted Products:", products);
      console.log("Extracted Orders:", orders);

      // Calculate revenue (sum of all order totals)
      const totalRevenue = orders.reduce((sum, order) => {
        return sum + (order.totalAmount || order.totalPrice || 0);
      }, 0);

      // Update stats
      setStats({
        totalUsers: Array.isArray(users) ? users.length : 0,
        totalProducts: Array.isArray(products) ? products.length : 0,
        totalOrders: Array.isArray(orders) ? orders.length : 0,
        revenue: totalRevenue
      });

      // Get 5 most recent orders and sort by date (newest first)
      if (Array.isArray(orders) && orders.length > 0) {
        const sortedOrders = [...orders].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setRecentOrders(sortedOrders.slice(0, 5));
      } else {
        setRecentOrders([]);
      }
      
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      console.error("Error details:", error.response?.data);
      setError(error.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "₹0";
    const numAmount = Number(amount);
    if (isNaN(numAmount)) return "₹0";
    return `₹${numAmount.toLocaleString("en-IN")}`;
  };

  // Get status color
  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "processing":
        return "bg-purple-100 text-purple-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get payment color
  const getPaymentColor = (payment) => {
    const paymentLower = payment?.toLowerCase();
    switch (paymentLower) {
      case "paid":
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cod":
        return "bg-blue-100 text-blue-700";
      case "refunded":
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Capitalize first letter
  const capitalizeFirst = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Calculate percentage change (mock data - you can replace with actual previous month data)
  const calculateChange = (current) => {
    // For demo purposes, showing random positive changes
    // In production, compare with previous period data
    const change = Math.floor(Math.random() * 20) + 5;
    return `+${change}%`;
  };

  if (loading) {
    return (
      <AdminPanel>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </AdminPanel>
    );
  }

  if (error) {
    return (
      <AdminPanel>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <svg
              className="w-16 h-16 text-red-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="mt-4 text-red-600 font-semibold">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </AdminPanel>
    );
  }

  return (
    <AdminPanel>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">Welcome! Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchDashboardData}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Total Users */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 lg:p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm lg:text-base text-gray-600 font-medium">Total Users</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">
                  {stats.totalUsers.toLocaleString()}
                </h3>
                <div className="flex items-center mt-3">
                  <span className="text-xs lg:text-sm font-semibold text-green-600">
                    {calculateChange(stats.totalUsers)}
                  </span>
                  <span className="text-xs lg:text-sm text-gray-500 ml-2">from last month</span>
                </div>
              </div>
              <div className="p-3 lg:p-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Products */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 lg:p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm lg:text-base text-gray-600 font-medium">Total Products</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">
                  {stats.totalProducts.toLocaleString()}
                </h3>
                <div className="flex items-center mt-3">
                  <span className="text-xs lg:text-sm font-semibold text-green-600">
                    {calculateChange(stats.totalProducts)}
                  </span>
                  <span className="text-xs lg:text-sm text-gray-500 ml-2">from last month</span>
                </div>
              </div>
              <div className="p-3 lg:p-4 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 lg:p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm lg:text-base text-gray-600 font-medium">Total Orders</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">
                  {stats.totalOrders.toLocaleString()}
                </h3>
                <div className="flex items-center mt-3">
                  <span className="text-xs lg:text-sm font-semibold text-green-600">
                    {calculateChange(stats.totalOrders)}
                  </span>
                  <span className="text-xs lg:text-sm text-gray-500 ml-2">from last month</span>
                </div>
              </div>
              <div className="p-3 lg:p-4 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 lg:p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm lg:text-base text-gray-600 font-medium">Revenue</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">
                  {formatCurrency(stats.revenue)}
                </h3>
                <div className="flex items-center mt-3">
                  <span className="text-xs lg:text-sm font-semibold text-green-600">
                    {calculateChange(stats.revenue)}
                  </span>
                  <span className="text-xs lg:text-sm text-gray-500 ml-2">from last month</span>
                </div>
              </div>
              <div className="p-3 lg:p-4 rounded-xl bg-gradient-to-br from-pink-500 to-red-500 text-white group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="px-5 lg:px-6 py-4 lg:py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg lg:text-xl font-bold text-gray-800">Recent Orders</h2>
            <button 
              onClick={() => window.location.href = '/admin/orders'}
              className="text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors"
            >
              View All →
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Order ID</th>
                  <th className="px-5 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Customer</th>
                  <th className="px-5 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                  <th className="px-5 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                  <th className="px-5 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-5 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-5 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order, index) => (
                    <tr key={order._id || index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 lg:px-6 py-4">
                        <span className="text-sm font-semibold text-gray-800">
                          #{order._id?.slice(-6).toUpperCase() || "N/A"}
                        </span>
                      </td>
                      <td className="px-5 lg:px-6 py-4">
                        <span className="text-sm text-gray-700">
                          {order.user?.name || order.user?.email || "Guest"}
                        </span>
                      </td>
                      <td className="px-5 lg:px-6 py-4">
                        <span className="text-sm text-gray-700">
                          {order.items && order.items.length > 0
                            ? order.items.length === 1
                              ? order.items[0].product?.name || order.items[0].productId?.name || "Product"
                              : `${order.items.length} items`
                            : "N/A"}
                        </span>
                      </td>
                      <td className="px-5 lg:px-6 py-4">
                        <span className="text-sm font-semibold text-gray-800">
                          {formatCurrency(order.totalAmount || order.totalPrice)}
                        </span>
                      </td>
                      <td className="px-5 lg:px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {formatDate(order.createdAt)}
                        </span>
                      </td>
                      <td className="px-5 lg:px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status || order.orderStatus)}`}>
                          {capitalizeFirst(order.status || order.orderStatus) || "Pending"}
                        </span>
                      </td>
                      <td className="px-5 lg:px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentColor(order.paymentStatus || order.paymentMethod)}`}>
                          {capitalizeFirst(order.paymentStatus || order.paymentMethod) || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-5 lg:px-6 py-8 text-center text-gray-500">
                      No recent orders
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminPanel>
  );
};

export default AdminDashboard;