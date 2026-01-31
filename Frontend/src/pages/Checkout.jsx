import React, { useState, useEffect } from "react";
import { useData } from "../context/Usecontext";
import { useLocation } from "react-router-dom";
import apiInstance from "../interceptor/interceptor";

const Checkout = () => {
  const { cart, fetchProductById, clearCart } = useData();
  const location = useLocation();
  const baseURL = apiInstance.defaults.baseURL;

  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cod");
  const [checkoutCart, setCheckoutCart] = useState([]);

  // Initialize checkoutCart
  useEffect(() => {
    const initCheckout = async () => {
      if (location.state?.buyNowItems) {
        const buyNowItems = location.state.buyNowItems;
        const productsWithFullData = await Promise.all(
          buyNowItems.map(async (item) => {
            if (!item.name) {
              const full = await fetchProductById(item._id);
              return { ...full, quantity: item.quantity || 1 };
            }
            return item;
          })
        );
        setCheckoutCart(productsWithFullData);
      } else {
        setCheckoutCart(cart);
      }
    };
    initCheckout();
  }, []);

  // Remove a product from checkoutCart
  const removeProduct = (productId) => {
    const updated = checkoutCart.filter((item) => item._id !== productId);
    setCheckoutCart(updated);
  };

  const totalPrice = checkoutCart.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );
  const tax = Math.round(totalPrice * 0.05);
  const delivery = totalPrice > 999 ? 0 : 49;
  const grandTotal = totalPrice + tax + delivery;

  const placeOrder = () => {
    if (!address) {
      alert("Please enter delivery address");
      return;
    }
    if (checkoutCart.length === 0) {
      alert("Your order is empty!");
      return;
    }
    console.log("Order placed", { checkoutCart, address, payment });
    alert("Order placed successfully 🎉");
    clearCart();
    setCheckoutCart([]);
  };

  if (!checkoutCart || checkoutCart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
        <div className="text-6xl mb-4 animate-bounce">🛒</div>
        <p className="text-xl font-semibold">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT - Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

          {checkoutCart.map((item, index) => (
            <div
              key={item._id}
              className={`flex gap-5 bg-white p-5 rounded-2xl shadow-lg transition-all duration-300 transform 
                hover:scale-105 hover:shadow-2xl
                ${index % 2 === 0 ? "animate-fadeInLeft" : "animate-fadeInRight"}`}
            >
              <img
                src={`${baseURL}/uploads/products/${item.image}`}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-500 mt-1">Qty: {item.quantity}</p>
                  <p className="text-lg font-bold mt-2">
                    ₹{(item.price || 0) * item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeProduct(item._id)}
                  className="mt-3 self-start text-red-500 font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Delivery Address */}
          <div className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl mt-4">
            <h2 className="text-xl font-bold mb-3">Delivery Address</h2>
            <textarea
              className="w-full border p-3 rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              rows={4}
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl mt-4">
            <h2 className="text-xl font-bold mb-3">Payment Method</h2>
            <select
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            >
              <option value="cod">Cash on Delivery</option>
              <option value="online">Online Payment</option>
            </select>
          </div>
        </div>

        {/* RIGHT - Order Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-lg h-fit sticky top-28 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
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

          <button
            onClick={placeOrder}
            className="mt-6 w-full py-4 rounded-2xl text-lg font-bold text-white 
                       bg-linear-to-r from-pink-500 to-red-500
                       transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
          >
            Place Order
          </button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            🔒 100% secure payment • Easy returns
          </p>
        </div>
      </div>

      {/* Tailwind custom animations */}
      <style>
        {`
          @keyframes fadeInLeft {
            0% {opacity:0; transform: translateX(-20px);}
            100% {opacity:1; transform: translateX(0);}
          }
          @keyframes fadeInRight {
            0% {opacity:0; transform: translateX(20px);}
            100% {opacity:1; transform: translateX(0);}
          }
          .animate-fadeInLeft {
            animation: fadeInLeft 0.5s ease forwards;
          }
          .animate-fadeInRight {
            animation: fadeInRight 0.5s ease forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Checkout;
