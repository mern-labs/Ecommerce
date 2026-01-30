import React from "react";
import { useParams } from "react-router-dom";
import { useData } from "../context/Usecontext";
import apiInstance from "../interceptor/interceptor";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, addToCart } = useData();
  const baseURL = apiInstance.defaults.baseURL;

  // Wait until products are loaded
  if (!products || products.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">Loading product...</p>
    );
  }

  const product = products.find((p) => p._id === id);

  if (!product) {
    return (
      <p className="text-center mt-10 text-gray-500">Product not found</p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <img
            src={`${baseURL}/uploads/products/${product.image}`}
            alt={product.name}
            className="w-full h-125 object-cover hover:scale-105 transition duration-500"
          />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-pink-600 mb-4">₹{product.price}</p>
          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description || "No description available"}
          </p>

          <div className="space-y-3 text-gray-700">
            <p><span className="font-semibold">Material:</span> {product.material || "Cotton Silk"}</p>
            <p><span className="font-semibold">Length:</span> {product.length || "6.3 meters"}</p>
            <p><span className="font-semibold">Category:</span> {product.category}</p>
          </div>

          <div className="mt-6">
            <p className="font-semibold text-gray-800 mb-2">Reviews</p>
            <p className="text-yellow-500">★★★★★ (4.8/5)</p>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="mt-8 w-full bg-linear-to-r from-pink-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
