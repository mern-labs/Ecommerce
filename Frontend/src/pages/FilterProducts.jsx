import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useData } from "../context/Usecontext";
import apiInstance from "../interceptor/interceptor";
import addtocartIcon from "../assets/addtocart.png";
import wishlistIcon from "../assets/wishlist.png";
import { toast } from "react-toastify";

const FilterProducts = () => {
  const { cart, addToCart, wishlist, toggleWishlist, user, products } = useData();

  const baseURL = apiInstance.defaults.baseURL;
  const [searchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("");

  // Loading states for individual items
  const [addingToCart, setAddingToCart] = useState(null);
  const [togglingWishlist, setTogglingWishlist] = useState(null);

  // ✅ Update category from URL params
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  /* ---------------- Helpers ---------------- */
  const isWishlisted = (id) => wishlist.some((item) => item._id === id);
  const isInCart = (id) => cart.some((item) => item._id === id);

  // Get unique values for filters
  const categories = [...new Set(products.map((p) => p.category))].filter(
    Boolean
  );
  const brands = [...new Set(products.map((p) => p.brand))].filter(Boolean);
  const colors = [...new Set(products.map((p) => p.color))].filter(Boolean);

  /* ---------------- Filter Logic ---------------- */
  const filteredProducts = products
    .filter((product) => {
      // Category filter
      if (selectedCategory && product.category !== selectedCategory)
        return false;

      // Brand filter
      if (selectedBrand && product.brand !== selectedBrand) return false;

      // Color filter
      if (selectedColor && product.color !== selectedColor) return false;

      // Price range filter
      if (priceRange.min && product.price < Number(priceRange.min))
        return false;
      if (priceRange.max && product.price > Number(priceRange.max))
        return false;

      return true;
    })
    .sort((a, b) => {
      // Sort logic
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  /* ---------------- Handlers ---------------- */
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
          toast.success(`${product.name} removed from wishlist`);
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

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedColor("");
    setPriceRange({ min: "", max: "" });
    setSortBy("");
    toast.info("Filters reset");
  };

  /* ---------------- Filter Sidebar Component ---------------- */
  const FilterSidebar = ({ isMobile = false }) => (
    <div className={`bg-linear-to-br from-pink-50 to-purple-50 rounded-lg shadow-lg border border-pink-100 ${isMobile ? 'p-4' : 'p-6'}`}>
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-pink-200">
        <h2 className="text-2xl font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Filters
        </h2>
        <button
          onClick={handleResetFilters}
          className="text-sm text-pink-600 hover:text-pink-800 font-semibold hover:underline transition"
        >
          Reset All
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-800 flex items-center gap-2">
          <span className="w-1 h-5 bg-pink-500 rounded"></span>
          Category
        </h3>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border-2 border-pink-200 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-800 flex items-center gap-2">
          <span className="w-1 h-5 bg-purple-500 rounded"></span>
          Brand
        </h3>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full border-2 border-purple-200 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-800 flex items-center gap-2">
          <span className="w-1 h-5 bg-pink-500 rounded"></span>
          Color
        </h3>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="w-full border-2 border-pink-200 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
        >
          <option value="">All Colors</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-800 flex items-center gap-2">
          <span className="w-1 h-5 bg-purple-500 rounded"></span>
          Price Range
        </h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: e.target.value })
            }
            className="w-1/2 border-2 border-purple-200 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: e.target.value })
            }
            className="w-1/2 border-2 border-purple-200 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          />
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-800 flex items-center gap-2">
          <span className="w-1 h-5 bg-pink-500 rounded"></span>
          Sort By
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border-2 border-pink-200 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
        >
          <option value="">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      {isMobile && (
        <button
          onClick={() => setShowMobileFilters(false)}
          className="w-full bg-linear-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition font-semibold shadow-md"
        >
          Apply Filters
        </button>
      )}
    </div>
  );

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-10xl mx-auto p-4 md:p-6">
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full bg-linear-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition font-semibold flex items-center justify-center gap-2 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clipRule="evenodd"
            />
          </svg>
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen p-4">
            <div className="bg-white rounded-lg max-w-md mx-auto">
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center rounded-t-lg z-10">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <FilterSidebar isMobile={true} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24">
            <FilterSidebar />
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {selectedCategory
                ? selectedCategory.replace(/-/g, " ")
                : "All Products"}
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              {filteredProducts.length} Product
              {filteredProducts.length !== 1 ? "s" : ""} Found
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">
                No products match your filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((item) => (
                <Link key={item._id} to={`/product/${item._id}`}>
                  {/* Card */}
                  <div className="rounded-2xl shadow-lg transition-all duration-300 p-4 bg-white cursor-pointer hover:shadow-2xl">
                    <div className="relative group overflow-hidden rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-100 object-cover transition-all duration-500 group-hover:scale-110 group-hover:saturate-150"
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

                        {/* Add to Cart — disabled once in cart */}
                        <button
                          disabled={isInCart(item._id) || addingToCart === item._id}
                          onClick={(e) => handleAddToCart(e, item)}
                          className={`w-10 h-10 rounded-full shadow flex items-center justify-center transition
                            ${
                              isInCart(item._id)
                                ? "bg-green-500 opacity-50 cursor-not-allowed"
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

                    <h3 className="text-lg font-semibold mt-3">{item.name}</h3>
                    <p className="text-gray-700 font-medium">₹{item.price}</p>
                    {item.brand && (
                      <p className="text-sm text-gray-500">{item.brand}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;