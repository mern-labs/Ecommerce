import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getProducts,
  getWishlist,
  addWishlist,
  removeWishlist,
  getAddToCart,
  addToCart as addToCartAPI,
  removeFromCart as removeFromCartAPI,
  updateAddToCart as updateCartAPI,
  clearAddToCart as clearCartAPI,
} from "../interceptor/interceptor";

const DataContext = createContext(null);

export function ProviderContext({ children }) {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // ---------------- Load from localStorage ----------------
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cart");
    const storedWishlist = localStorage.getItem("wishlist");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
  }, []);

  // ---------------- Fetch Products ----------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data.data || []);
      } catch (err) {
        console.log("Product fetch error:", err.message);
      }
    };
    fetchProducts();
  }, []);

  // ---------------- Fetch Wishlist ----------------
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;
      try {
        const res = await getWishlist();
        // FIXED: read the correct field
        const wishlistData = res.data?.wishlist || res.data?.products || [];
        setWishlist(wishlistData);
        localStorage.setItem("wishlist", JSON.stringify(wishlistData));
      } catch (err) {
        console.log("Wishlist fetch error:", err.message);
        setWishlist([]);
        localStorage.removeItem("wishlist");
      }
    };
    fetchWishlist();
  }, [user]);

  // ---------------- Fetch Cart ----------------
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;

      try {
        const res = await getAddToCart();
        const cartData =
          res.products?.map((item) => ({
            ...item.product,
            quantity: item.quantity,
          })) || [];
        setCart(cartData);
        localStorage.setItem("cart", JSON.stringify(cartData));
      } catch (err) {
        console.log("Cart fetch error:", err.message);
        setCart([]);
        localStorage.removeItem("cart");
      }
    };
    fetchCart();
  }, [user]);

  // ---------------- Auth ----------------
  const login = async (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);
    setUser(data);

    // fetch wishlist
    try {
      const wishRes = await getWishlist();
      const wishlistData = wishRes.data?.wishlist || wishRes.data?.products || [];
      setWishlist(wishlistData);
      localStorage.setItem("wishlist", JSON.stringify(wishlistData));
    } catch (err) {
      console.log("Wishlist fetch error:", err.message);
      setWishlist([]);
      localStorage.removeItem("wishlist");
    }

    // fetch cart
    try {
      const cartRes = await getAddToCart();
      const cartData =
        cartRes.products?.map((item) => ({
          ...item.product,
          quantity: item.quantity,
        })) || [];
      setCart(cartData);
      localStorage.setItem("cart", JSON.stringify(cartData));
    } catch (err) {
      console.log("Cart fetch error:", err.message);
      setCart([]);
      localStorage.removeItem("cart");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");

    setUser(null);
    setCart([]);
    setWishlist([]);
  };

  // ---------------- CART ACTIONS ----------------
  const addToCart = async (productId, quantity = 1) => {
    try {
      await addToCartAPI(productId, quantity);
      const res = await getAddToCart();
      const cartData =
        res.products?.map((item) => ({
          ...item.product,
          quantity: item.quantity,
        })) || [];
      setCart(cartData);
      localStorage.setItem("cart", JSON.stringify(cartData));
    } catch (err) {
      console.log("Add to cart error:", err.message);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await removeFromCartAPI(productId);
      const res = await getAddToCart();
      const cartData =
        res.products?.map((item) => ({
          ...item.product,
          quantity: item.quantity,
        })) || [];
      setCart(cartData);
      localStorage.setItem("cart", JSON.stringify(cartData));
    } catch (err) {
      console.log("Remove from cart error:", err.message);
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    try {
      await updateCartAPI(productId, quantity);
      const res = await getAddToCart();
      const cartData =
        res.products?.map((item) => ({
          ...item.product,
          quantity: item.quantity,
        })) || [];
      setCart(cartData);
      localStorage.setItem("cart", JSON.stringify(cartData));
    } catch (err) {
      console.log("Update cart error:", err.message);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartAPI();
      setCart([]);
      localStorage.removeItem("cart");
    } catch (err) {
      console.log("Clear cart error:", err.message);
    }
  };

  // ---------------- WISHLIST ACTIONS ----------------
  const addToWishlistHandler = async (product) => {
    try {
      await addWishlist(product._id);
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } catch (err) {
      console.log("Add wishlist error:", err.message);
    }
  };

  const removeFromWishlistHandler = async (productId) => {
    try {
      await removeWishlist(productId);
      const updated = wishlist.filter((p) => p._id !== productId);
      setWishlist(updated);
      localStorage.setItem("wishlist", JSON.stringify(updated));
    } catch (err) {
      console.log("Remove wishlist error:", err.message);
    }
  };

  const toggleWishlist = (product) => {
    wishlist.find((p) => p._id === product._id)
      ? removeFromWishlistHandler(product._id)
      : addToWishlistHandler(product);
  };

  return (
    <DataContext.Provider
      value={{
        user,
        products,
        cart,
        wishlist,
        login,
        logout,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addToWishlist: addToWishlistHandler,
        removeFromWishlist: removeFromWishlistHandler,
        toggleWishlist,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
