import React, { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useData } from "../context/Usecontext";
import addtocartIcon from "../assets/addtocart.png";
import wishlistIcon from "../assets/wishlist.png";
import { toast } from "react-toastify";

const Products = () => {
  const { cart, addToCart, wishlist, toggleWishlist, user, products } = useData();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category");

  const [addingToCart, setAddingToCart] = useState(null);
  const [togglingWishlist, setTogglingWishlist] = useState(null);

  const INITIAL_DISPLAY_COUNT = 16;

  /* ---------------- Helpers ---------------- */
  const isWishlisted = (id) => wishlist.some((item) => item._id === id);
  const isInCart = (id) => cart.some((item) => item._id === id);

  // Helper function to get image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "https://via.placeholder.com/400x400?text=No+Image";
    
    // If it's already a full URL (Cloudinary), return it
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // If it's a relative path, return placeholder (you can adjust this if needed)
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  /* ---------------- Add to Cart Handler ---------------- */
  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    if (isInCart(product._id)) {
      toast.info(`${product.name} is already in cart`);
      return;
    }

    try {
      setAddingToCart(product._id);
      
      const existing = cart.find((p) => p._id === product._id);
      const result = existing
        ? await addToCart(product._id, existing.quantity + 1)
        : await addToCart(product._id, 1);

      if (result.success) {
        toast.success(`${product.name} added to cart! 🛒`);
      } else {
        toast.error(result.error || "Failed to add to cart");
      }
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCart(null);
    }
  };

  /* ---------------- Wishlist Handler ---------------- */
  const handleWishlistClick = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to use wishlist ❤️");
      return;
    }

    try {
      setTogglingWishlist(product._id);
      
      const wasWishlisted = isWishlisted(product._id);
      const result = await toggleWishlist(product);

      if (result.success) {
        if (wasWishlisted) {
          toast.info(`${product.name} removed from wishlist`);
        } else {
          toast.success(`${product.name} added to wishlist ❤️`);
        }
      } else {
        toast.error(result.error || "Failed to update wishlist");
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
      console.error("Error toggling wishlist:", error);
    } finally {
      setTogglingWishlist(null);
    }
  };

  /* ---------------- See More Handler ---------------- */
  const handleSeeMore = () => {
    if (category) {
      navigate(`/products/filter?category=${category}`);
    } else {
      navigate("/products/filter");
    }
  };

  /* ---------------- Filter ---------------- */
  const filteredProducts = category
    ? products.filter(
        (item) => item.category?.toLowerCase() === category.toLowerCase()
      )
    : products;

  /* ---------------- Display Logic ---------------- */
  const displayedProducts = filteredProducts.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMoreProducts = filteredProducts.length > INITIAL_DISPLAY_COUNT;

  /* ---------------- UI ---------------- */
  return (
    <div className="p-6">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 capitalize">
          {category ? category.replace(/-/g, " ") : "All Products"}
        </h1>
        <p className="mt-3 text-gray-500">
          Our Collections With Elegance
        </p>
        <div className="mt-4 flex justify-center">
          <span className="w-24 h-1 bg-linear-to-r from-pink-500 to-red-500 rounded-full"></span>
        </div>
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No products found</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          >
            Go to Home
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((item) => (
              <Link key={item._id} to={`/product/${item._id}`}>
                {/* Card */}
                <div className="rounded-2xl shadow-lg transition-all duration-300 p-4 bg-white cursor-pointer hover:shadow-2xl">
                  <div className="relative group overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      className="w-full h-100 object-cover transition-all duration-500 group-hover:scale-110 group-hover:saturate-150"
                      onError={(e) => {
                        console.error("Image failed to load:", item.image);
                        e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
                      }}
                    />

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition">
                      {/* Wishlist */}
                      <button
                        onClick={(e) => handleWishlistClick(e, item)}
                        disabled={togglingWishlist === item._id}
                        className={`w-10 h-10 rounded-full shadow flex items-center justify-center hover:scale-110 transition
                          ${isWishlisted(item._id) ? "bg-red-500" : "bg-white"}
                          ${togglingWishlist === item._id ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {togglingWishlist === item._id ? (
                          <div className="animate-spin h-5 w-5 border-2 border-pink-500 border-t-transparent rounded-full"></div>
                        ) : (
                          <img
                            src={wishlistIcon}
                            alt="Wishlist"
                            className={`w-6 h-6 ${
                              isWishlisted(item._id) ? "invert brightness-0" : ""
                            }`}
                          />
                        )}
                      </button>

                      {/* Add to Cart */}
                      <button
                        disabled={isInCart(item._id) || addingToCart === item._id || !item.instock}
                        onClick={(e) => handleAddToCart(e, item)}
                        className={`w-10 h-10 rounded-full shadow flex items-center justify-center transition
                          ${
                            isInCart(item._id)
                              ? "bg-green-500 opacity-50 cursor-not-allowed"
                              : !item.instock
                              ? "bg-gray-400 opacity-50 cursor-not-allowed"
                              : addingToCart === item._id
                              ? "bg-white opacity-50 cursor-not-allowed"
                              : "bg-white hover:scale-110"
                          }`}
                      >
                        {addingToCart === item._id ? (
                          <div className="animate-spin h-5 w-5 border-2 border-pink-500 border-t-transparent rounded-full"></div>
                        ) : (
                          <img
                            src={addtocartIcon}
                            alt="Cart"
                            className="w-6 h-6"
                          />
                        )}
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mt-3 line-clamp-2">{item.name}</h3>
                  <p className="text-gray-700 font-medium">₹{item.price}</p>
                  {!item.instock && (
                    <p className="text-xs text-red-500 mt-1">Out of Stock</p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* See More Button */}
          {hasMoreProducts && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleSeeMore}
                className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span>See More</span>
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;