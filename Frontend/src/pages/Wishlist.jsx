import React, { useState } from "react";
import { useData } from "../context/Usecontext";
import apiInstance, { removeWishlist } from "../interceptor/interceptor";

const Wishlist = () => {
  const { wishlist, removeFromWishlist} = useData();
  const baseURL = apiInstance.defaults.baseURL;

  const [removingId, setRemovingId] = useState(null);

  if (!wishlist || wishlist.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">
        ❤️ Your wishlist is empty
      </p>
    );
  }

  const handleRemove = async (productId) => {
    try {
      setRemovingId(productId);

      // backend remove
      await removeWishlist(productId)

      // frontend update
      removeFromWishlist(productId);
    } catch (err) {
      console.error("Failed to remove wishlist item:", err);
      alert("Failed to remove item from wishlist");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        ❤️ My Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="border rounded-xl shadow hover:shadow-lg transition bg-white"
          >
            <img
              src={
                item.image
                  ? `${baseURL}/uploads/products/${item.image}`
                  : "https://via.placeholder.com/300x300?text=No+Image"
              }
              alt={item.name}
              className="w-full h-80 object-cover rounded-t-xl"
            />

            <div className="p-4 text-center">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-gray-600">₹{item.price}</p>

              <button
                onClick={() => handleRemove(item._id)}
                disabled={removingId === item._id}
                className={`mt-3 px-4 py-2 rounded-lg text-white transition ${
                  removingId === item._id
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {removingId === item._id
                  ? "Removing..."
                  : "Remove"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
