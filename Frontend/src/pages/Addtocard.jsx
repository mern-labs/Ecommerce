import React from "react";
import { useData } from "../context/Usecontext";
import apiInstance from "../interceptor/interceptor";

const Addtocard = () => {
  const { cart, addToCart, removeFromCart } = useData();
  const baseURL = apiInstance.defaults.baseURL;

  const handleIncrement = (product) => {
    addToCart(product, product.quantity + 1);
  };

  const handleDecrement = (product) => {
    if (product.quantity > 1) addToCart(product, product.quantity - 1);
  };

  if (!cart || cart.length === 0) {
    return <p className="text-center mt-10 text-gray-500">🛒 Your cart is empty</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">🛒 My Cart</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cart.map((item) => (
          <div
            key={item._id}
            className="border rounded-xl shadow hover:shadow-lg transition bg-white"
          >
            <img
              src={`${baseURL}/uploads/products/${item.image}`}
              alt={item.name}
              className="w-full h-80 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-gray-600">₹{item.price}</p>

              {/* Quantity controls */}
              <div className="flex items-center justify-center gap-3 mt-3">
                <button
                  onClick={() => handleDecrement(item)}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  −
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                  onClick={() => handleIncrement(item)}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addtocard;
