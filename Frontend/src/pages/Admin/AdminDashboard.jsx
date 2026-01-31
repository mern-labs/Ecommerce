import React from "react";
import AdminPanel from "./AdminPanel";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      positive: true,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Products",
      value: "456",
      change: "+8%",
      positive: true,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Total Orders",
      value: "789",
      change: "+15%",
      positive: true,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Revenue",
      value: "₹2.4M",
      change: "+23%",
      positive: true,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "from-pink-500 to-red-500",
    },
  ];

  const recentOrders = [
    { id: "#ORD-001", customer: "Priya Sharma", product: "Banarasi Silk Saree", amount: "₹12,500", status: "Delivered", date: "Jan 28, 2026" },
    { id: "#ORD-002", customer: "Anjali Patel", product: "Kanjivaram Saree", amount: "₹18,900", status: "Pending", date: "Jan 29, 2026" },
    { id: "#ORD-003", customer: "Meera Reddy", product: "Cotton Saree", amount: "₹3,500", status: "Shipped", date: "Jan 30, 2026" },
    { id: "#ORD-004", customer: "Lakshmi Iyer", product: "Silk Saree", amount: "₹8,700", status: "Processing", date: "Jan 30, 2026" },
    { id: "#ORD-005", customer: "Divya Kumar", product: "Designer Saree", amount: "₹25,000", status: "Delivered", date: "Jan 31, 2026" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Processing":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-5 lg:p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm lg:text-base text-gray-600 font-medium">{stat.title}</p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">{stat.value}</h3>
                  <div className="flex items-center mt-3">
                    <span className={`text-xs lg:text-sm font-semibold ${stat.positive ? "text-green-600" : "text-red-600"}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs lg:text-sm text-gray-500 ml-2">from last month</span>
                  </div>
                </div>
                <div className={`p-3 lg:p-4 rounded-xl bg-gradient-to-br ${stat.gradient} text-white group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="px-5 lg:px-6 py-4 lg:py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg lg:text-xl font-bold text-gray-800">Recent Orders</h2>
            <button className="text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors">
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 lg:px-6 py-4"><span className="text-sm font-semibold text-gray-800">{order.id}</span></td>
                    <td className="px-5 lg:px-6 py-4"><span className="text-sm text-gray-700">{order.customer}</span></td>
                    <td className="px-5 lg:px-6 py-4"><span className="text-sm text-gray-700">{order.product}</span></td>
                    <td className="px-5 lg:px-6 py-4"><span className="text-sm font-semibold text-gray-800">{order.amount}</span></td>
                    <td className="px-5 lg:px-6 py-4"><span className="text-sm text-gray-600">{order.date}</span></td>
                    <td className="px-5 lg:px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminPanel>
  );
};

export default AdminDashboard;