import React, { useMemo, useState, useEffect, useRef } from "react";
import { useData } from "../context/Usecontext";
import apiInstance from "../interceptor/interceptor";
import { Link, useNavigate, useLocation } from "react-router-dom";
import addtocartIcon from "../assets/addtocart.png";
import wishlistIcon from "../assets/wishlist.png";

const FilterProducts = () => {
  const { products, cart, wishlist, addToCart, toggleWishlist, user } = useData();
  const baseURL = apiInstance.defaults.baseURL;

  const navigate = useNavigate();
  const location = useLocation();

  const productsRef = useRef(null); // Ref for scrolling

  // Read category from URL query
  const searchParams = new URLSearchParams(location.search);
  const categoryFromQuery = searchParams.get("category") || "";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categoryFromQuery);
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  // Sync URL with category state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // Scroll to top of products grid whenever filters change
  useEffect(() => {
    if (productsRef.current) {
      productsRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [category, search, maxPrice]);

  /* ---------------- Helpers ---------------- */
  const isWishlisted = (id) => wishlist.some((item) => item._id === id);
  const isInCart = (id) => cart.some((item) => item._id === id);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    const existing = cart.find((p) => p._id === product._id);
    if (existing) {
      addToCart(product._id, existing.quantity + 1);
    } else {
      addToCart(product._id, 1);
    }
  };

  const handleWishlistClick = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      alert("Please login to use wishlist ❤️");
      return;
    }
    toggleWishlist(product);
  };

  const categories = useMemo(() => {
    const cats = products.map((p) => p.category);
    return [...new Set(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category ? p.category === category : true;
      const matchPrice = maxPrice ? p.price <= Number(maxPrice) : true;
      return matchSearch && matchCategory && matchPrice;
    });
  }, [products, search, category, maxPrice]);

  /* ---------------- Filter UI ---------------- */
  const FilterUI = (
    <div className="bg-gradient-to-b from-white to-gray-50 h-full flex flex-col">
      <div
        className="p-6 overflow-y-auto space-y-6
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        <h2 className="text-xl font-bold tracking-wide">Filters</h2>

        {/* Search */}
        <div>
          <label className="text-sm font-semibold text-gray-600 mb-2 block">Search</label>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Category</h3>
          <div className="space-y-2">
            <button
              onClick={() => setCategory("")}
              className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition
              ${category === "" ? "bg-purple-600 text-white shadow" : "bg-white border hover:bg-gray-100"}`}
            >
              All Products
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition
                ${category === cat ? "bg-purple-600 text-white shadow" : "bg-white border hover:bg-gray-100"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Max Price */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Max Price</h3>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Enter max price"
            className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>
      </div>

      <div className="p-6 border-t bg-white">
        <button
          onClick={() => {
            setSearch("");
            setCategory("");
            setMaxPrice("");
          }}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-10xl mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Explore Products
        </h1>

        <button
          onClick={() => setShowFilter(true)}
          className="md:hidden bg-black text-white px-4 py-2 rounded-xl"
        >
          Filters
        </button>
      </div>

      {showFilter && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowFilter(false)}
          />
          <div className="fixed left-0 top-0 h-full w-80 bg-white z-50 shadow-xl">
            {FilterUI}
          </div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sticky Filter */}
        <div className="hidden md:block md:col-span-1 sticky top-45 self-start h-[80vh] border rounded-3xl shadow-lg overflow-hidden">
          {FilterUI}
        </div>

        {/* Products Grid */}
        <div
          ref={productsRef} // Attach ref here for scrolling
          className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProducts.length === 0 && <p>No products found</p>}

          {filteredProducts.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`}>
              <div className="group bg-white border rounded-3xl shadow hover:shadow-xl transition p-4">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={`${baseURL}/uploads/products/${product.image}`}
                    alt={product.name}
                    className="h-100 w-full object-cover group-hover:scale-110 transition"
                  />

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={(e) => handleWishlistClick(product, e)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow
                      ${isWishlisted(product._id) ? "bg-red-500" : "bg-white"}`}
                    >
                      <img
                        src={wishlistIcon}
                        className={`w-5 h-5 ${
                          isWishlisted(product._id) ? "invert brightness-0" : ""
                        }`}
                      />
                    </button>

                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow
                      ${isInCart(product._id) ? "bg-green-500" : "bg-white"}`}
                    >
                      <img src={addtocartIcon} className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <h3 className="mt-4 font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600">₹{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;
