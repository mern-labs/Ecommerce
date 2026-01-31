import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useData } from "../context/Usecontext";
import apiInstance from "../interceptor/interceptor";
import addtocartIcon from "../assets/addtocart.png";
import wishlistIcon from "../assets/wishlist.png";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    fetchProductById,
    addToCart,
    cart,
    wishlist,
    toggleWishlist,
    products,
    user,
  } = useData();

  const [selectedProductId, setSelectedProductId] = useState(id);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  const baseURL = apiInstance.defaults.baseURL;

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const data = await fetchProductById(selectedProductId);
      setProduct(data);
      setQty(1);
      setLoading(false);
      window.scrollTo(0, 0);
    };
    loadProduct();
  }, [selectedProductId, fetchProductById]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">Loading product...</p>
    );
  }

  if (!product) {
    return (
      <p className="text-center mt-10 text-gray-500">Product not found</p>
    );
  }

  const remainingProducts = products.filter((p) => p._id !== product._id);

  const isWishlisted = (id) =>
    wishlist.some((item) => item._id === id);

  const isInCart = (id) =>
    cart.some((item) => item._id === id);

  const handleAddToCartCard = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    const existing = cart.find((p) => p._id === item._id);
    if (existing) {
      addToCart(item._id, existing.quantity + 1);
    } else {
      addToCart(item._id, 1);
    }
  };

  const handleWishlistClick = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("Please login to use wishlist ❤️");
      return;
    }

    toggleWishlist(item);
  };

  // ✅ Buy Now
  const handleBuyNow = () => {
    // Add current product to cart
    addToCart(product._id, qty);

    // Navigate to checkout
    navigate("/checkout", {
      state: {
        buyNowItem: {
          productId: product._id,
          quantity: qty,
        },
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-16">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <div className="overflow-hidden rounded-2xl shadow-lg">
          <img
            src={`${baseURL}/uploads/products/${product.image}`}
            alt={product.name}
            className="w-full h-130 object-cover hover:scale-105 transition duration-500"
          />
        </div>

        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
            {product.name}
          </h1>

          <p className="text-lg text-gray-500 mb-2">{product.brand}</p>

          <p className="text-3xl font-bold text-pink-600 mb-4">
            ₹{product.price}
          </p>

          <p className="text-yellow-500 mb-4">
            ⭐ {product.ratings} ({product.reviews} reviews)
          </p>

          <p className={`font-semibold mb-4 ${product.instock ? "text-green-600" : "text-red-600"}`}>
            {product.instock ? `In Stock (${product.stock})` : "Out of Stock"}
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description || "No description available"}
          </p>

          <div className="grid grid-cols-2 gap-3 text-gray-700 mb-6">
            <p><b>Category:</b> {product.category}</p>
            <p><b>Material:</b> {product.material}</p>
            <p><b>Color:</b> {product.color}</p>
            <p><b>Length:</b> {product.length}</p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="font-semibold">Quantity</span>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="border w-20 px-3 py-2 rounded-lg"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => addToCart(product._id, qty)}
              className="flex-1 bg-pink-500 text-white py-3 rounded-xl font-semibold hover:opacity-90"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {remainingProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {remainingProducts.map((item) => (
              <Link
                key={item._id}
                to={`/product/${item._id}`}
                onClick={() => setSelectedProductId(item._id)}
              >
                <div className="border rounded-xl shadow-md hover:shadow-xl transition p-4 bg-white cursor-pointer">

                  <div className="relative group overflow-hidden rounded-lg">
                    <img
                      src={`${baseURL}/uploads/products/${item.image}`}
                      alt={item.name}
                      className="w-full h-100 object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition">

                      <button
                        onClick={(e) => handleWishlistClick(e, item)}
                        className={`w-10 h-10 rounded-full shadow flex items-center justify-center hover:scale-110 transition
                        ${isWishlisted(item._id) ? "bg-red-500" : "bg-white"}`}
                      >
                        <img
                          src={wishlistIcon}
                          className={`w-6 h-6 ${isWishlisted(item._id) ? "invert brightness-0" : ""}`}
                        />
                      </button>

                      <button
                        onClick={(e) => handleAddToCartCard(e, item)}
                        className={`w-10 h-10 rounded-full shadow flex items-center justify-center hover:scale-110 transition
                        ${isInCart(item._id) ? "bg-green-500" : "bg-white"}`}
                      >
                        <img src={addtocartIcon} className="w-6 h-6" />
                      </button>

                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mt-3">
                    {item.name}
                  </h3>
                  <p className="text-gray-700 font-medium">
                    ₹{item.price}
                  </p>
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
