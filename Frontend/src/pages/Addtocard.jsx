import React from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/Usecontext";
import apiInstance from "../interceptor/interceptor";

const Addtocard = () => {
  const { cart, removeFromCart, updateCartQuantity } = useData();
  const baseURL = apiInstance.defaults.baseURL;
  const navigate = useNavigate();

  const handleIncrement = (product) => {
    updateCartQuantity(product._id, product.quantity + 1);
  };

  const handleDecrement = (product) => {
    if (product.quantity > 1) {
      updateCartQuantity(product._id, product.quantity - 1);
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // premium fake breakdown
  const delivery = totalPrice > 999 ? 0 : 49;
  const tax = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + delivery + tax;

  // ✅ Navigate to checkout
  const handleBuyNow = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    navigate("/checkout", {
      state: { buyNowItems: cart },
    });
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
        <div className="text-6xl mb-4">🛒</div>
        <p className="text-xl font-semibold">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-3xl font-bold text-center py-6">
          My Cart ({totalItems})
        </h1>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT — CART ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex gap-5"
            >
              <img
                onClick={() => navigate(`/product/${item._id}`)}
                src={`${baseURL}/uploads/products/${item.image}`}
                alt={item.name}
                className="w-40 h-40 object-cover rounded-xl cursor-pointer hover:scale-105 transition"
              />

              <div className="flex-1">
                <h2
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="text-xl font-semibold cursor-pointer hover:underline"
                >
                  {item.name}
                </h2>

                <p className="text-2xl font-bold mt-1">₹{item.price}</p>

                {/* Quantity */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => handleDecrement(item)}
                    className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    −
                  </button>

                  <span className="font-semibold text-lg">{item.quantity}</span>

                  <button
                    onClick={() => handleIncrement(item)}
                    className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  Subtotal: ₹{item.price * item.quantity}
                </p>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="mt-4 text-red-500 font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — PREMIUM CHECKOUT PANEL */}
        <div className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-28">
          <h2 className="text-xl font-bold mb-5">Order Summary</h2>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Items ({totalItems})</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>₹{tax}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>
                {delivery === 0 ? (
                  <span className="text-green-600 font-semibold">FREE</span>
                ) : (
                  `₹${delivery}`
                )}
              </span>
            </div>

            <div className="border-t pt-3 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>

          {/* Premium Buy Now Button */}
          <button
            onClick={handleBuyNow}
            className="mt-6 w-full py-4 rounded-2xl text-lg font-bold text-white 
                       bg-gradient-to-r from-black to-gray-800
                       hover:scale-105 active:scale-95 transition shadow-lg"
          >
            Secure Checkout
          </button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            🔒 100% secure payment • Easy returns
          </p>
        </div>
      </div>
    </div>
  );
};

export default Addtocard;
