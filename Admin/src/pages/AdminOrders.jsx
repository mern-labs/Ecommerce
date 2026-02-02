import React, { useState } from "react";
import AdminPanel from "./AdminPanel";

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const orders = [
    { id: "#ORD-001", customer: "Priya Sharma", product: "Banarasi Silk Saree", amount: "₹12,500", date: "Jan 28, 2026", status: "Delivered", payment: "Paid" },
    { id: "#ORD-002", customer: "Anjali Patel", product: "Kanjivaram Saree", amount: "₹18,900", date: "Jan 29, 2026", status: "Pending", payment: "Pending" },
    { id: "#ORD-003", customer: "Meera Reddy", product: "Cotton Saree", amount: "₹3,500", date: "Jan 30, 2026", status: "Shipped", payment: "Paid" },
    { id: "#ORD-004", customer: "Lakshmi Iyer", product: "Silk Saree", amount: "₹8,700", date: "Jan 30, 2026", status: "Processing", payment: "Paid" },
    { id: "#ORD-005", customer: "Divya Kumar", product: "Designer Saree", amount: "₹25,000", date: "Jan 31, 2026", status: "Delivered", payment: "Paid" },
    { id: "#ORD-006", customer: "Sneha Gupta", product: "Chiffon Saree", amount: "₹5,500", date: "Jan 31, 2026", status: "Cancelled", payment: "Refunded" },
    { id: "#ORD-007", customer: "Kavya Singh", product: "Net Saree", amount: "₹4,200", date: "Jan 31, 2026", status: "Processing", payment: "Paid" },
    { id: "#ORD-008", customer: "Riya Nair", product: "Georgette Saree", amount: "₹6,800", date: "Jan 31, 2026", status: "Shipped", payment: "Paid" },
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
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentColor = (payment) => {
    switch (payment) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Refunded":
        return "bg-red-100 text-red-700";
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
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800">Orders Management</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">Track and manage all orders</p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg text-sm font-medium hover:from-pink-600 hover:to-red-600 transition-all shadow-lg">
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Orders
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{orders.length}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Delivered</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {orders.filter(o => o.status === "Delivered").length}
                </h3>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {orders.filter(o => o.status === "Pending" || o.status === "Processing").length}
                </h3>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">₹85K</h3>
              </div>
              <div className="p-3 bg-pink-100 rounded-lg">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by order ID or customer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none text-sm"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none text-sm font-medium"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 lg:px-6 py-4 text-left">
                    <input type="checkbox" className="w-4 h-4 text-pink-600 rounded border-gray-300 focus:ring-pink-500" />
                  </th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Order ID</th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Customer</th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Payment</th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 lg:px-6 py-4">
                      <input type="checkbox" className="w-4 h-4 text-pink-600 rounded border-gray-300 focus:ring-pink-500" />
                    </td>
                    <td className="px-5 lg:px-6 py-4"><span className="text-sm font-semibold text-gray-800">{order.id}</span></td>
                    <td className="px-5 lg:px-6 py-4"><span className="text-sm text-gray-700">{order.customer}</span></td>
                    <td className="px-5 lg:px-6 py-4"><span className="text-sm text-gray-700">{order.product}</span></td>
                    <td className="px-5 lg:px-6 py-4"><span className="text-sm font-semibold text-gray-800">{order.amount}</span></td>
                    <td className="px-5 lg:px-6 py-4"><span className="text-sm text-gray-600">{order.date}</span></td>
                    <td className="px-5 lg:px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>{order.status}</span>
                    </td>
                    <td className="px-5 lg:px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentColor(order.payment)}`}>{order.payment}</span>
                    </td>
                    <td className="px-5 lg:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="p-2 hover:bg-green-50 rounded-lg transition-colors" title="Update Status">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="p-2 hover:bg-purple-50 rounded-lg transition-colors" title="Print Invoice">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-5 lg:px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">1-{orders.length}</span> of <span className="font-semibold">{orders.length}</span> orders
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Previous</button>
              <button className="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg text-sm font-medium">1</button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">2</button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>
    </AdminPanel>
  );
};

export default AdminOrders;