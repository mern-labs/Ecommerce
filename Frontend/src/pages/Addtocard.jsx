import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/Usecontext";
import apiInstance from "../interceptor/interceptor";
import { toast } from "react-toastify";

const Addtocard = () => {
  const { cart, removeFromCart, updateCart, user } = useData();
  const baseURL = apiInstance.defaults.baseURL;
  const navigate = useNavigate();
  
  const [removingId, setRemovingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      toast.error("Please login to view cart");
      navigate("/login");
    }
  }, [user, navigate]);

  const handleIncrement = async (product) => {
    try {
      setUpdatingId(product._id);
      const result = await updateCart(product._id, product.quantity + 1);
      
      if (result.success) {
        toast.success(`Updated quantity to ${product.quantity + 1}`);
      } else {
        toast.error(result.error || "Failed to update quantity");
      }
    } catch (error) {
      toast.error("Failed to update quantity");
      console.error("Error incrementing:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDecrement = async (product) => {
    if (product.quantity > 1) {
      try {
        setUpdatingId(product._id);
        const result = await updateCart(product._id, product.quantity - 1);
        
        if (result.success) {
          toast.success(`Updated quantity to ${product.quantity - 1}`);
        } else {
          toast.error(result.error || "Failed to update quantity");
        }
      } catch (error) {
        toast.error("Failed to update quantity");
        console.error("Error decrementing:", error);
      } finally {
        setUpdatingId(null);
      }
    } else {
      toast.info("Minimum quantity is 1");
    }
  };

  const handleRemove = async (productId, productName) => {
    try {
      setRemovingId(productId);
      
      const result = await removeFromCart(productId);
      
      if (result.success) {
        toast.success(`${productName} removed from cart`);
      } else {
        toast.error(result.error || `Failed to remove ${productName}`);
      }
    } catch (error) {
      toast.error(`Failed to remove ${productName}`);
      console.error("Error removing item:", error);
    } finally {
      setRemovingId(null);
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Premium breakdown
  const delivery = totalPrice > 999 ? 0 : 49;
  const tax = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + delivery + tax;

  // ✅ Navigate to checkout
  const handleBuyNow = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    navigate("/checkout", {
      state: { buyNowItems: cart },
    });
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[70vh] text-gray-500 px-4">
        <div className="text-5xl sm:text-6xl md:text-7xl mb-4">🛒</div>
        <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center">Your cart is empty</p>
        <button
          onClick={() => navigate("/products/filter")}
          className="px-6 py-3 bg-linear-to-r from-pink-500 to-red-500 text-white rounded-lg hover:from-pink-600 hover:to-red-600 transition transform hover:scale-105 active:scale-95 shadow-lg text-sm sm:text-base"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center py-4 sm:py-5 md:py-6 px-4">
          My Cart ({totalItems})
        </h1>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {/* LEFT — CART ITEMS */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className={`bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all p-3 sm:p-4 md:p-5 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 ${
                removingId === item._id ? 'opacity-50 scale-95' : ''
              }`}
            >
              <img
                onClick={() => navigate(`/product/${item._id}`)}
                src={item.image}
                alt={item.name}
                className="w-full sm:w-32 md:w-40 h-48 sm:h-32 md:h-40 object-cover rounded-lg sm:rounded-xl cursor-pointer hover:scale-105 transition"
              />

              <div className="flex-1">
                <h2
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="text-base sm:text-lg md:text-xl font-semibold cursor-pointer hover:underline line-clamp-2"
                >
                  {item.name}
                </h2>

                <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2 text-pink-600">₹{item.price}</p>

                {/* Quantity */}
                <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                  <button
                    onClick={() => handleDecrement(item)}
                    disabled={item.quantity <= 1 || updatingId === item._id || removingId === item._id}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-bold text-base sm:text-lg transition
                      ${item.quantity <= 1 || updatingId === item._id || removingId === item._id
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 active:scale-95'}`}
                  >
                    −
                  </button>

                  <span className="font-semibold text-base sm:text-lg min-w-8 sm:min-w-10 text-center">
                    {updatingId === item._id ? (
                      <div className="animate-spin h-4 w-4 sm:h-5 sm:w-5 border-2 border-pink-500 border-t-transparent rounded-full mx-auto"></div>
                    ) : (
                      item.quantity
                    )}
                  </span>

                  <button
                    onClick={() => handleIncrement(item)}
                    disabled={updatingId === item._id || removingId === item._id}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-bold text-base sm:text-lg transition
                      ${updatingId === item._id || removingId === item._id
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 active:scale-95'}`}
                  >
                    +
                  </button>
                </div>

                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 font-medium">
                  Subtotal: <span className="text-gray-800 font-bold">₹{item.price * item.quantity}</span>
                </p>

                <button
                  onClick={() => handleRemove(item._id, item.name)}
                  disabled={removingId === item._id}
                  className={`mt-3 sm:mt-4 font-semibold text-sm sm:text-base transition ${
                    removingId === item._id
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-red-500 hover:text-red-700 hover:underline active:scale-95'
                  }`}
                >
                  {removingId === item._id ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin h-3 w-3 sm:h-4 sm:w-4 border-2 border-red-500 border-t-transparent rounded-full"></div>
                      Removing...
                    </span>
                  ) : (
                    '🗑️ Remove'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — PREMIUM CHECKOUT PANEL */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 h-fit lg:sticky lg:top-24">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Order Summary</h2>

          <div className="space-y-3 sm:space-y-4 text-gray-700">
            <div className="flex justify-between text-sm sm:text-base">
              <span>Items ({totalItems})</span>
              <span className="font-semibold">₹{totalPrice}</span>
            </div>

            <div className="flex justify-between text-sm sm:text-base">
              <span>Tax (5%)</span>
              <span className="font-semibold">₹{tax}</span>
            </div>

            <div className="flex justify-between text-sm sm:text-base">
              <span>Delivery</span>
              <span>
                {delivery === 0 ? (
                  <span className="text-green-600 font-bold">FREE ✓</span>
                ) : (
                  <span className="font-semibold">₹{delivery}</span>
                )}
              </span>
            </div>

            {totalPrice <= 999 && totalPrice > 0 && (
              <p className="text-xs sm:text-sm text-gray-500 bg-yellow-50 p-2 sm:p-2.5 rounded-lg">
                💡 Add ₹{1000 - totalPrice} more for FREE delivery!
              </p>
            )}

            <div className="border-t-2 border-gray-200 pt-3 sm:pt-4 flex justify-between text-lg sm:text-xl font-bold text-gray-900">
              <span>Total</span>
              <span className="text-pink-600">₹{grandTotal}</span>
            </div>
          </div>

          {/* Premium Buy Now Button */}
          <button
            onClick={handleBuyNow}
            disabled={removingId !== null}
            className={`mt-4 sm:mt-6 w-full py-3 sm:py-4 rounded-lg sm:rounded-xl text-base sm:text-lg font-bold text-white 
                       bg-linear-to-r from-pink-500 to-red-500
                       hover:from-pink-600 hover:to-red-600
                       hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl
                       ${removingId !== null ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Proceed to Checkout
          </button>

          <p className="text-[10px] sm:text-xs text-gray-500 mt-3 sm:mt-4 text-center">
            🔒 100% secure payment • Easy returns
          </p>

          <button
            onClick={() => navigate("/products/filter")}
            className="mt-3 sm:mt-4 w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold text-pink-600 
                       border-2 border-pink-500 hover:bg-pink-50 active:scale-95 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addtocard;