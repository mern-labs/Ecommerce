import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useData } from "../context/Usecontext";
import addtocartIcon from "../assets/addtocart.png";
import wishlistIcon from "../assets/wishlist.png";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    fetchProductById,
    addToCart,
    cart,
    wishlist,
    toggleWishlist,
    user,
    products,
  } = useData();

  const [selectedProductId, setSelectedProductId] = useState(id);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  
  const [addingToCartMain, setAddingToCartMain] = useState(false);
  const [addingToCartCard, setAddingToCartCard] = useState(null);
  const [togglingWishlist, setTogglingWishlist] = useState(null);
  
  // State for showing more products
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        console.log("=== ProductDetails Loading ===");
        console.log("selectedProductId:", selectedProductId);
        
        // Try fetching from API first
        let data = await fetchProductById(selectedProductId);
        console.log("Data from fetchProductById:", data);
        
        // If API fails or returns null, try to find in products array
        if (!data || !data._id) {
          console.log("API fetch failed, searching in products array...");
          data = products.find(p => p._id === selectedProductId);
          console.log("Found in products array:", data);
        }
        
        if (data && data._id) {
          console.log("✅ Product loaded successfully");
          console.log("Product data:", data);
          console.log("Product image:", data.image);
          setProduct(data);
          setQty(1);
        } else {
          console.error("❌ Product not found");
          setProduct(null);
          toast.error("Product not found");
        }
      } catch (error) {
        console.error("❌ Error loading product:", error);
        
        // Last resort: check products array
        const fallbackProduct = products.find(p => p._id === selectedProductId);
        if (fallbackProduct) {
          console.log("✅ Using fallback product from array");
          setProduct(fallbackProduct);
          setQty(1);
        } else {
          toast.error("Failed to load product");
          setProduct(null);
        }
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    if (selectedProductId) {
      loadProduct();
    } else {
      console.error("No selectedProductId provided");
      setLoading(false);
    }
  }, [selectedProductId, fetchProductById, products]);

  console.log("Current product state:", product);
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-500 mb-4">Product not found</p>
          <button
            onClick={() => navigate("/")}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const remainingProducts = products.filter((p) => p._id !== product._id);
  
  // Determine how many products to show
  const productsToShow = showAllProducts ? remainingProducts : remainingProducts.slice(0, 12);

  const isWishlisted = (id) => wishlist.some((item) => item._id === id);
  const isInCart = (id) => cart.some((item) => item._id === id);
  const mainProductInCart = isInCart(product._id);

  const handleAddToCartCard = async (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    if (isInCart(item._id)) {
      toast.info(`${item.name} is already in cart`);
      return;
    }

    try {
      setAddingToCartCard(item._id);
      
      const existing = cart.find((p) => p._id === item._id);
      const result = existing
        ? await addToCart(item._id, existing.quantity + 1)
        : await addToCart(item._id, 1);

      if (result.success) {
        toast.success(`${item.name} added to cart! 🛒`);
      } else {
        toast.error(result.error || "Failed to add to cart");
      }
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCartCard(null);
    }
  };

  const handleWishlistClick = async (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to use wishlist ❤️");
      return;
    }

    try {
      setTogglingWishlist(item._id);
      
      const wasWishlisted = isWishlisted(item._id);
      const result = await toggleWishlist(item);

      if (result.success) {
        if (wasWishlisted) {
          toast.success(`${item.name} removed from wishlist`);
        } else {
          toast.success(`${item.name} added to wishlist ❤️`);
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

  const handleAddToCartMain = async () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      setAddingToCartMain(true);
      
      // If product is already in cart, update the quantity
      if (mainProductInCart) {
        const result = await addToCart(product._id, qty);
        if (result.success) {
          toast.success(`Updated ${product.name} quantity to ${qty}! 🛒`);
        } else {
          toast.error(result.error || "Failed to update cart");
        }
      } else {
        // Add new product to cart
        const result = await addToCart(product._id, qty);
        if (result.success) {
          toast.success(`${product.name} added to cart! 🛒`);
        } else {
          toast.error(result.error || "Failed to add to cart");
        }
      }
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCartMain(false);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please login to proceed");
      return;
    }

    navigate("/checkout", {
      state: {
        buyNowItems: [
          {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: qty,
          },
        ],
      },
    });
  };

  // Helper function to get image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
      console.log("No image URL provided");
      return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
    }
    
    // If it's already a full URL, return it
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // If it's a relative path, prepend your backend URL
    // Uncomment and configure if needed:
    // return `http://localhost:3000${imageUrl}`;
    
    return imageUrl;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-12 sm:space-y-16">
      {/* Main Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* Product Image */}
        <div className="overflow-hidden rounded-2xl shadow-lg bg-gray-100">
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            className="w-full h-80 sm:h-96 md:h-130 object-cover hover:scale-105 transition duration-500"
            onError={(e) => {
              console.error("Image failed to load:", product.image);
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800">
            {product.name}
          </h1>

          <p className="text-base sm:text-lg text-gray-500">{product.brand}</p>

          <p className="text-2xl sm:text-3xl font-bold text-pink-600">
            ₹{product.price}
          </p>

          <p className="text-yellow-500 text-sm sm:text-base">
            ⭐ {product.ratings || 0} ({product.reviews || 0} reviews)
          </p>

          <p
            className={`font-semibold text-sm sm:text-base ${
              product.instock ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.instock ? `In Stock (${product.stock})` : "Out of Stock"}
          </p>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            {product.description || "No description available"}
          </p>

          <div className="grid grid-cols-2 gap-3 text-gray-700 text-sm sm:text-base">
            <p>
              <b>Category:</b> {product.category || "N/A"}
            </p>
            <p>
              <b>Material:</b> {product.material || "N/A"}
            </p>
            <p>
              <b>Color:</b> {product.color || "N/A"}
            </p>
            <p>
              <b>Length:</b> {product.length || "N/A"}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="font-semibold text-sm sm:text-base">Quantity</span>
            <input
              type="number"
              min="1"
              max={product.stock || 1}
              value={qty}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 1 && value <= (product.stock || 1)) {
                  setQty(value);
                }
              }}
              className="border border-gray-300 w-16 sm:w-20 px-2 sm:px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
            <button
              disabled={addingToCartMain || !product.instock}
              onClick={handleAddToCartMain}
              className={`flex-1 py-3 rounded-xl font-semibold transition text-sm sm:text-base
                ${
                  !product.instock
                    ? "bg-gray-400 text-white opacity-50 cursor-not-allowed"
                    : addingToCartMain
                    ? "bg-pink-400 text-white opacity-70 cursor-not-allowed"
                    : "bg-pink-500 text-white hover:bg-pink-600 active:scale-95"
                }`}
            >
              {addingToCartMain ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  {mainProductInCart ? "Updating..." : "Adding..."}
                </span>
              ) : !product.instock ? (
                "Out of Stock"
              ) : mainProductInCart ? (
                "Update Cart"
              ) : (
                "Add to Cart"
              )}
            </button>

            <button
              disabled={!product.instock}
              onClick={handleBuyNow}
              className={`flex-1 py-3 rounded-xl font-semibold transition text-sm sm:text-base
                ${
                  !product.instock
                    ? "bg-gray-400 text-white opacity-50 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800 active:scale-95"
                }`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {remainingProducts.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">You may also like</h2>
            {remainingProducts.length > 12 && (
              <button
                onClick={() => setShowAllProducts(!showAllProducts)}
                className="text-pink-500 hover:text-pink-600 font-semibold text-sm sm:text-base transition"
              >
                {showAllProducts ? "Show Less" : `View All (${remainingProducts.length})`}
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {productsToShow.map((item) => (
              <Link
                key={item._id}
                to={`/product/${item._id}`}
                onClick={() => setSelectedProductId(item._id)}
              >
                <div className="rounded-xl shadow-md hover:shadow-xl transition p-3 sm:p-4 bg-white cursor-pointer">
                  <div className="relative group overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      className="w-full h-48 sm:h-64 md:h-80 lg:h-100 object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        console.error("Image failed to load:", item.image);
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
                      }}
                    />

                    <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition">
                      <button
                        onClick={(e) => handleWishlistClick(e, item)}
                        disabled={togglingWishlist === item._id}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow flex items-center justify-center hover:scale-110 transition
                          ${isWishlisted(item._id) ? "bg-red-500" : "bg-white"}
                          ${togglingWishlist === item._id ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {togglingWishlist === item._id ? (
                          <div className="animate-spin h-4 w-4 sm:h-5 sm:w-5 border-2 border-pink-500 border-t-transparent rounded-full"></div>
                        ) : (
                          <img
                            src={wishlistIcon}
                            className={`w-4 h-4 sm:w-6 sm:h-6 ${
                              isWishlisted(item._id) ? "invert brightness-0" : ""
                            }`}
                            alt="Wishlist"
                          />
                        )}
                      </button>

                      <button
                        disabled={isInCart(item._id) || addingToCartCard === item._id || !item.instock}
                        onClick={(e) => handleAddToCartCard(e, item)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow flex items-center justify-center transition
                          ${
                            isInCart(item._id)
                              ? "bg-green-500 opacity-50 cursor-not-allowed"
                              : !item.instock
                              ? "bg-gray-400 opacity-50 cursor-not-allowed"
                              : addingToCartCard === item._id
                              ? "bg-white opacity-50 cursor-not-allowed"
                              : "bg-white hover:scale-110"
                          }`}
                      >
                        {addingToCartCard === item._id ? (
                          <div className="animate-spin h-4 w-4 sm:h-5 sm:w-5 border-2 border-pink-500 border-t-transparent rounded-full"></div>
                        ) : (
                          <img
                            src={addtocartIcon}
                            className="w-4 h-4 sm:w-6 sm:w-6"
                            alt="Cart"
                          />
                        )}
                      </button>
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold mt-2 sm:mt-3 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 font-medium">₹{item.price}</p>
                  {!item.instock && (
                    <p className="text-xs text-red-500 mt-1">Out of Stock</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;