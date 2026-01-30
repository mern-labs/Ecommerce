import React, { useState } from "react";
import { useData } from "../context/Usecontext";
import apiInstance from "../interceptor/interceptor";
import addtocartIcon from "../assets/addtocart.png";
import wishlistIcon from "../assets/wishlist.png";

const Products = () => {
  const { products, addToCart, wishlist, toggleWishlist } = useData();
  const baseURL = apiInstance.defaults.baseURL;

  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedToCart((prev) => ({ ...prev, [product._id]: true }));
  };

  const isWishlisted = (id) => wishlist.some((p) => p._id === id);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div key={item._id} className="border rounded-xl shadow-md hover:shadow-xl transition p-4 bg-white">
            {/* Image */}
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src={`${baseURL}/uploads/products/${item.image}`}
                alt={item.name}
                className="w-full h-100 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition">
                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(item)}
                  className={`w-10 h-10 rounded-full shadow flex items-center justify-center hover:scale-110 transition
                    ${isWishlisted(item._id) ? "bg-red-500" : "bg-white"}`}
                >
                  <img src={wishlistIcon} className={`w-6 h-6 ${isWishlisted(item._id) ? "invert brightness-0" : ""}`} />
                </button>

                {/* Add to Cart */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className={`w-10 h-10 rounded-full shadow flex items-center justify-center hover:scale-110 transition
                    ${addedToCart[item._id] ? "bg-green-500" : "bg-white"}`}
                >
                  <img src={addtocartIcon} className="w-6 h-6" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-3">{item.name}</h3>
            <p className="text-gray-700 font-medium">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
