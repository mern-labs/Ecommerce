import React, { createContext, useContext, useEffect, useState } from "react";
import { getProducts } from "../interceptor/interceptor";

const DataContext = createContext(null);

export function ProviderContext({ children }) {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cart");
    const storedWishlist = localStorage.getItem("wishlist");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchProducts();
  }, []);

  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    setUser(null);
    setCart([]);
    setWishlist([]);
  };

  // ✅ Ensure product always has quantity
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const exist = prev.find((p) => p._id === product._id);
      let updated;
      if (exist) {
        updated = prev.map((p) =>
          p._id === product._id ? { ...p, quantity } : p
        );
      } else {
        updated = [...prev, { ...product, quantity }];
      }
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (productId) => {
    const updated = cart.filter((p) => p._id !== productId);
    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);
  };

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.find((p) => p._id === product._id)) return prev;
      const updated = [...prev, product];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromWishlist = (productId) => {
    const updated = wishlist.filter((p) => p._id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlist(updated);
  };

  const toggleWishlist = (product) => {
    wishlist.find((p) => p._id === product._id)
      ? removeFromWishlist(product._id)
      : addToWishlist(product);
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
        addToWishlist,
        removeFromWishlist,
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
