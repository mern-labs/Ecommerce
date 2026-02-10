import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/Usecontext";
import apiInstance, { removeWishlist } from "../interceptor/interceptor";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useData();
  const baseURL = apiInstance.defaults.baseURL;
  const navigate = useNavigate();
  const [removingId, setRemovingId] = useState(null);

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
        <div className="text-6xl mb-4">❤️</div>
        <p className="text-xl font-semibold mb-4">Your wishlist is empty</p>
        <button
          onClick={() => navigate("/products/filter")}
          className="px-6 py-3 bg-linear-to-r from-pink-500 to-red-500 text-white rounded-lg hover:from-pink-600 hover:to-red-600 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleRemove = async (productId, productName) => {
    try {
      setRemovingId(productId);
      
      // Remove from backend
      await removeWishlist(productId);
      
      // Remove from frontend
      removeFromWishlist(productId);
      
      // Show success toast
      toast.success(`${productName} removed from wishlist`);
    } catch (err) {
      toast.error(`Failed to remove ${productName} from wishlist`);
      console.error("Failed to remove wishlist item:", err);
    } finally {
      setRemovingId(null);
    }
  };

  const goToDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        ❤️ My Wishlist ({wishlist.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className={`rounded-xl shadow hover:shadow-xl transition bg-white overflow-hidden group max-w-sm ${
              removingId === item._id ? 'opacity-50 scale-95' : ''
            }`}
          >
            {/* Clickable Image */}
            <div
              className="overflow-hidden cursor-pointer"
              onClick={() => goToDetails(item._id)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-80 lg:h-100 object-cover group-hover:scale-105 transition"
              />
            </div>
            <div className="p-4 text-center">
              {/* Clickable Name */}
              <h2
                onClick={() => goToDetails(item._id)}
                className="font-semibold text-lg cursor-pointer hover:underline line-clamp-2 mb-2"
              >
                {item.name}
              </h2>
              <p className="text-gray-600 text-xl font-bold mb-3">₹{item.price}</p>
              
              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item._id, item.name)}
                disabled={removingId === item._id}
                className={`mt-3 px-4 py-2 rounded-lg text-white w-full transition font-semibold ${
                  removingId === item._id
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600 active:scale-95"
                }`}
              >
                {removingId === item._id ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Removing...
                  </span>
                ) : (
                  "🗑️ Remove"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;