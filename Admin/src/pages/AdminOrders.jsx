import React, { useState, useMemo } from "react";
import AdminPanel from "./AdminPanel";
import { useAdminData } from "../context/AdminContext";

const AdminOrders = () => {
  const { orders, ordersLoading } = useAdminData();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Calculate total revenue from actual orders
  const totalRevenue = useMemo(() => {
    if (!orders || orders.length === 0) return 0;
    return orders.reduce((sum, order) => sum + (order.totalAmount || order.totalPrice || 0), 0);
  }, [orders]);

  // Filter and search orders
  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    return orders.filter((order) => {
      const searchMatch =
        order._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.user?.email?.toLowerCase().includes(searchQuery.toLowerCase());

      const orderStatus = order.status || order.orderStatus;
      const statusMatch =
        filterStatus === "all" ||
        orderStatus?.toLowerCase() === filterStatus.toLowerCase();

      return searchMatch && statusMatch;
    });
  }, [orders, searchQuery, filterStatus]);

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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "₹0";
    const numAmount = Number(amount);
    if (isNaN(numAmount)) return "₹0";
    return `₹${numAmount.toLocaleString("en-IN")}`;
  };

  // Capitalize first letter
  const capitalizeFirst = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Calculate order totals for preview
  const calculateOrderTotals = (order) => {
    if (!order) return { subtotal: 0, shipping: 0, discount: 0, total: 0 };

    // Calculate subtotal from items
    let subtotal = 0;
    if (order.items && order.items.length > 0) {
      subtotal = order.items.reduce((sum, item) => {
        const itemPrice = item.price || item.product?.price || item.productId?.price || 0;
        const quantity = Number(item.quantity) || 1;
        return sum + (itemPrice * quantity);
      }, 0);
    }

    const shipping = Number(order.shippingCost) || 0;
    const discount = Number(order.discount) || 0;
    const total = Number(order.totalAmount) || Number(order.totalPrice) || subtotal + shipping - discount;

    return { subtotal, shipping, discount, total };
  };

  // Handle preview order
  const handlePreview = (order) => {
    setSelectedOrder(order);
    setShowPreview(true);
  };

  // Close preview
  const closePreview = () => {
    setShowPreview(false);
    setSelectedOrder(null);
  };

  if (ordersLoading) {
    return (
      <AdminPanel>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading orders...</p>
          </div>
        </div>
      </AdminPanel>
    );
  }

  return (
    <AdminPanel>
      <div className="space-y-6 -mt-3">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800">Orders Management</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">Track and manage all orders</p>
          </div>
          <button className="px-4 py-2 bg-linear-to-r from-pink-500 to-red-500 text-white rounded-lg text-sm font-medium hover:from-pink-600 hover:to-red-600 transition-all shadow-lg">
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
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{orders?.length || 0}</h3>
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
                  {orders?.filter(o => {
                    const status = (o.status || o.orderStatus)?.toLowerCase();
                    return status === "delivered";
                  }).length || 0}
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
                  {orders?.filter(o => {
                    const status = (o.status || o.orderStatus)?.toLowerCase();
                    return status === "pending" || status === "processing";
                  }).length || 0}
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
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(totalRevenue)}</h3>
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
                {filteredOrders && filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <tr key={order._id || index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 lg:px-6 py-4">
                        <input type="checkbox" className="w-4 h-4 text-pink-600 rounded border-gray-300 focus:ring-pink-500" />
                      </td>
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
                      <td className="px-5 lg:px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handlePreview(order)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors" 
                            title="View Details"
                          >
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-5 lg:px-6 py-8 text-center">
                      <p className="text-gray-500">No orders found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-5 lg:px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">1-{filteredOrders?.length || 0}</span> of <span className="font-semibold">{orders?.length || 0}</span> orders
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Previous</button>
              <button className="px-3 py-1.5 bg-linear-to-r from-pink-500 to-red-500 text-white rounded-lg text-sm font-medium">1</button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">2</button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Next</button>
            </div>
          </div>
        </div>

        {/* Order Preview Modal */}
        {showPreview && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                <button 
                  onClick={closePreview}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Order Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Order ID */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Order ID</p>
                    <p className="text-lg font-semibold text-gray-800">
                      #{selectedOrder._id?.slice(-6).toUpperCase()}
                    </p>
                  </div>

                  {/* Order Date */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Order Date</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {formatDate(selectedOrder.createdAt)}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Order Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedOrder.status || selectedOrder.orderStatus)}`}>
                      {capitalizeFirst(selectedOrder.status || selectedOrder.orderStatus) || "Pending"}
                    </span>
                  </div>

                  {/* Payment Status */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getPaymentColor(selectedOrder.paymentStatus || selectedOrder.paymentMethod)}`}>
                      {capitalizeFirst(selectedOrder.paymentStatus || selectedOrder.paymentMethod) || "Pending"}
                    </span>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="text-base font-medium text-gray-800">
                        {selectedOrder.user?.name || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-base font-medium text-gray-800">
                        {selectedOrder.user?.email || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="text-base font-medium text-gray-800">
                        {selectedOrder.user?.phone || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                {selectedOrder.shippingAddress && (
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Address</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-base text-gray-800">
                        {selectedOrder.shippingAddress.street && `${selectedOrder.shippingAddress.street}, `}
                        {selectedOrder.shippingAddress.city && `${selectedOrder.shippingAddress.city}, `}
                        {selectedOrder.shippingAddress.state && `${selectedOrder.shippingAddress.state} `}
                        {selectedOrder.shippingAddress.zipCode && `- ${selectedOrder.shippingAddress.zipCode}`}
                        {selectedOrder.shippingAddress.country && `, ${selectedOrder.shippingAddress.country}`}
                      </p>
                    </div>
                  </div>
                )}

                {/* Order Items */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items && selectedOrder.items.length > 0 ? (
                      selectedOrder.items.map((item, index) => {
                        // Handle different possible data structures
                        const productName = item.product?.name || item.productId?.name || "Product";
                        const itemPrice = item.price || item.product?.price || item.productId?.price || 0;
                        const itemQuantity = item.quantity || 1;
                        const itemSize = item.size || item.product?.size || item.productId?.size;
                        
                        return (
                          <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800">
                                {productName}
                              </p>
                              <p className="text-sm text-gray-600">
                                Quantity: {itemQuantity}
                              </p>
                              {itemSize && (
                                <p className="text-sm text-gray-600">Size: {itemSize}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-800">
                                {formatCurrency(itemPrice * itemQuantity)}
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatCurrency(itemPrice)} each
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-500">No items found</p>
                    )}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    {(() => {
                      const totals = calculateOrderTotals(selectedOrder);
                      return (
                        <>
                          <div className="flex justify-between text-gray-700">
                            <span>Subtotal</span>
                            <span className="font-medium">{formatCurrency(totals.subtotal)}</span>
                          </div>
                          {totals.shipping > 0 && (
                            <div className="flex justify-between text-gray-700">
                              <span>Shipping</span>
                              <span className="font-medium">{formatCurrency(totals.shipping)}</span>
                            </div>
                          )}
                          {totals.discount > 0 && (
                            <div className="flex justify-between text-green-600">
                              <span>Discount</span>
                              <span className="font-medium">-{formatCurrency(totals.discount)}</span>
                            </div>
                          )}
                          <div className="border-t border-gray-300 pt-2 mt-2">
                            <div className="flex justify-between text-lg font-bold text-gray-800">
                              <span>Total</span>
                              <span>{formatCurrency(totals.total)}</span>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={closePreview}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button className="flex-1 px-4 py-3 bg-linear-to-r from-pink-500 to-red-500 text-white rounded-lg font-medium hover:from-pink-600 hover:to-red-600 transition-all">
                    Print Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminPanel>
  );
};

export default AdminOrders;