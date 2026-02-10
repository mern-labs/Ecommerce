import React, { useState, useEffect } from "react";
import { useData } from "../context/Usecontext";
import apiInstance from "../interceptor/interceptor";

const Order = () => {
  const { order, removeOrder, loading, fetchOrders } = useData();
  
  const [deletingId, setDeletingId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // ✅ REFRESH ORDERS WHEN COMPONENT MOUNTS
  useEffect(() => {
    if (fetchOrders) {
      fetchOrders();
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (!order || order.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
        <div className="text-6xl mb-4">📦</div>
        <p className="text-xl font-semibold mb-4">You have no orders yet.</p>
        <button
          onClick={() => (window.location.href = "/products/filter")}
          className="px-6 py-3 bg-linear-to-r from-pink-500 to-red-500 text-white rounded-lg hover:from-pink-600 hover:to-red-600 transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  // Open confirm popup
  const handleConfirm = (orderId) => {
    setSelectedOrderId(orderId);
    setShowConfirm(true);
  };

  // Delete order
  const handleDelete = async () => {
    try {
      setDeletingId(selectedOrderId);
      await removeOrder(selectedOrderId);
      setShowConfirm(false);
      // ✅ REFRESH ORDERS AFTER DELETION
      if (fetchOrders) {
        await fetchOrders();
      }
    } catch (err) {
      console.error("Failed to delete order:", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          My Orders ({order.length})
        </h2>

        <div className="space-y-6">
          {order.map((o) => (
            <div
              key={o._id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition"
            >
              {/* Order Info */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-700">
                      Order ID:
                    </span>{" "}
                    <span className="text-gray-600">{o._id}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-gray-700">
                      Date:
                    </span>{" "}
                    <span className="text-gray-600">
                      {new Date(o.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                </div>

                <div className="space-y-2 mt-4 md:mt-0 md:text-right">
                  <p className="text-lg">
                    <span className="font-semibold text-gray-700">
                      Total:
                    </span>{" "}
                    <span className="text-pink-600 font-bold">₹{o.totalAmount}</span>
                  </p>

                  <p>
                    <span className="font-semibold text-gray-700">
                      Status:
                    </span>{" "}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        o.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : o.status === "processing"
                          ? "bg-blue-100 text-blue-800"
                          : o.status === "shipped"
                          ? "bg-indigo-100 text-indigo-800"
                          : o.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {o.status.toUpperCase()}
                    </span>
                  </p>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleConfirm(o._id)}
                    disabled={deletingId === o._id}
                    className={`mt-2 w-full md:w-auto ${
                      deletingId === o._id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white px-5 py-2 rounded-lg font-semibold text-sm transition shadow-md hover:shadow-lg`}
                  >
                    {deletingId === o._id ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Deleting...
                      </span>
                    ) : (
                      "🗑️ Delete Order"
                    )}
                  </button>
                </div>
              </div>

              <hr className="border-gray-200 my-4" />

              {/* Order Items */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 mb-3">Order Items:</h3>
                {o.items && o.items.length > 0 ? (
                  o.items.map((item, index) => (
                    item.product ? (
                      <div
                        key={`${item._id}-${index}`}
                        className="flex items-center gap-4 border border-gray-100 rounded-xl p-3 hover:shadow-md transition"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {item.product.name}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            ₹{item.product.price} × {item.quantity} ={" "}
                            <span className="font-bold text-gray-700">
                              ₹{item.product.price * item.quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div
                        key={`${item._id}-${index}`}
                        className="flex items-center gap-4 border border-gray-100 rounded-xl p-3 bg-gray-50"
                      >
                        <div className="w-20 h-20 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
                          N/A
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800">
                            Product Not Available
                          </h3>
                          <p className="text-gray-500 text-sm">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                    )
                  ))
                ) : (
                  <p className="text-gray-500">No items in this order</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONFIRM DELETE POPUP */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md text-center shadow-2xl">
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                Delete Order?
              </h3>
              <p className="text-gray-600">
                Are you sure you want to delete this order? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border-2 border-gray-300 hover:bg-gray-50 rounded-lg py-3 font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deletingId}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg py-3 font-semibold transition disabled:opacity-50"
              >
                {deletingId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;