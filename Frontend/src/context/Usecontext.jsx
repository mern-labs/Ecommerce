import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  getWishlist,
  addWishlist,
  removeWishlist,
  getAddToCart,
  addToCart as addToCartAPI,
  removeFromCart as removeFromCartAPI,
  updateAddToCart as updateCartAPI,
  clearAddToCart as clearCartAPI,
  getProductById as getProductByIdAPI,
  getOrder,
  getProducts,
  getBanner,
  removeOrder as removeOrderAPI
} from "../interceptor/interceptor";


const DataContext = createContext(null);


export function ProviderContext({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState([]);


  // ---------------- Restore from localStorage ----------------
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cart");
    const storedWishlist = localStorage.getItem("wishlist");
    const storedBanner = localStorage.getItem("banner");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
    if (storedBanner) setBanner(JSON.parse(storedBanner));

    setLoading(false);
  }, []);

  // ---------------------- GET BANNER ----------------------
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await getBanner();
        const bannerData = res?.banners || [];
        console.log("Banners",res.banners);
        setBanner(bannerData);
        localStorage.setItem("banner", JSON.stringify(bannerData));

      } catch (error) {
        console.log("Banner fetch error:", error.message);
      }
    };

    fetchBanner();
  }, []);

  
  // ------------------- GET products --------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        const allProducts = res.data || [];
        
        const uniqueProducts = allProducts.filter((product, index, self) =>
          index === self.findIndex((p) => p._id === product._id)
        );
        
        setProducts(uniqueProducts);
      } catch (err) {
        console.log("Products fetch error:", err.message);
      }
    };

    fetchProducts();
  }, []);

  // ---------------- Fetch Wishlist ----------------
  useEffect(() => {
    if (!user) return;

    const fetchWishlist = async () => {
      try {
        const res = await getWishlist();
        const wishlistData = res.products || [];
        console.log("whishlistData",wishlistData);
        
        const uniqueWishlist = wishlistData.filter((item, index, self) =>
          index === self.findIndex((w) => w._id === item._id)
        );
        
        setWishlist(uniqueWishlist);
        localStorage.setItem("wishlist", JSON.stringify(uniqueWishlist));
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
    if (!user) return;

    const fetchCart = async () => {
      try {
        const res = await getAddToCart();
        
        const cartData = res.products?.map((item) => ({
          ...item.product,
          quantity: item.quantity,
        })) || [];
        
        const uniqueCart = cartData.filter((item, index, self) =>
          index === self.findIndex((c) => c._id === item._id)
        );
        
        setCart(uniqueCart);
        localStorage.setItem("cart", JSON.stringify(uniqueCart));
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
    if (data.role) localStorage.setItem("role", data.role);
    setUser(data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setCart([]);
    setWishlist([]);
    setCurrentProduct(null);
    setOrder([]);
  };

  // ---------------- FETCH PRODUCT BY ID - FIXED ----------------
  const fetchProductById = useCallback(async (id) => {
    try {
      console.log("=== fetchProductById START ===");
      console.log("Requested ID:", id);
      
      const res = await getProductByIdAPI(id);
      
      console.log("API Response:", res);
      console.log("API Response type:", typeof res);
      
      // Since we changed interceptor to return res.data, 
      // handle different possible backend response structures
      let product = null;
      
      if (res?.product) {
        // Backend returns { product: {...} }
        product = res.product;
        console.log("✅ Found product at res.product");
      } else if (res?.data) {
        // Backend returns { data: {...} }
        product = res.data;
        console.log("✅ Found product at res.data");
      } else if (res?._id) {
        // Backend returns product directly {...}
        product = res;
        console.log("✅ Found product as direct object");
      }
      
      console.log("Final extracted product:", product);
      console.log("=== fetchProductById END ===");
      
      setCurrentProduct(product);
      return product;
    } catch (err) {
      console.error("❌ Fetch product by ID error:", err);
      setCurrentProduct(null);
      return null;
    }
  }, []);

  // ---------------- WISHLIST OPERATIONS ----------------
  const addToWishlist = async (productId) => {
    try {
      await addWishlist(productId);
      const res = await getWishlist();
      const wishlistData = res.products || [];
      
      const uniqueWishlist = wishlistData.filter((item, index, self) =>
        index === self.findIndex((w) => w._id === item._id)
      );
      
      setWishlist(uniqueWishlist);
      localStorage.setItem("wishlist", JSON.stringify(uniqueWishlist));
      return { success: true };
    } catch (err) {
      console.log("Add to wishlist error:", err.message);
      return { success: false, error: err.message };
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await removeWishlist(productId);
      const res = await getWishlist();
      const wishlistData = res.products || [];
      
      const uniqueWishlist = wishlistData.filter((item, index, self) =>
        index === self.findIndex((w) => w._id === item._id)
      );
      
      setWishlist(uniqueWishlist);
      localStorage.setItem("wishlist", JSON.stringify(uniqueWishlist));
      return { success: true };
    } catch (err) {
      console.log("Remove from wishlist error:", err.message);
      return { success: false, error: err.message };
    }
  };

  const toggleWishlist = async (product) => {
    const isInWishlist = wishlist.some((item) => item._id === product._id);
    
    if (isInWishlist) {
      return await removeFromWishlist(product._id);
    } else {
      return await addToWishlist(product._id);
    }
  };

  // ---------------- CART OPERATIONS ----------------
  const addToCart = async (productId, quantity = 1) => {
    try {
      await addToCartAPI(productId, quantity);
      const res = await getAddToCart();
      
      const cartData = res.products?.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      })) || [];
      
      const uniqueCart = cartData.filter((item, index, self) =>
        index === self.findIndex((c) => c._id === item._id)
      );
      
      setCart(uniqueCart);
      localStorage.setItem("cart", JSON.stringify(uniqueCart));
      return { success: true };
    } catch (err) {
      console.log("Add to cart error:", err.message);
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await removeFromCartAPI(productId);
      const res = await getAddToCart();
      
      const cartData = res.products?.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      })) || [];
      
      const uniqueCart = cartData.filter((item, index, self) =>
        index === self.findIndex((c) => c._id === item._id)
      );
      
      setCart(uniqueCart);
      localStorage.setItem("cart", JSON.stringify(uniqueCart));
      return { success: true };
    } catch (err) {
      console.log("Remove from cart error:", err.message);
      return { success: false, error: err.message };
    }
  };

  const updateCart = async (productId, quantity) => {
    try {
      if (quantity < 1) {
        return { success: false, error: "Minimum quantity is 1" };
      }

      await updateCartAPI(productId, quantity);
      const res = await getAddToCart();
      
      const cartData = res.products?.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      })) || [];
      
      const uniqueCart = cartData.filter((item, index, self) =>
        index === self.findIndex((c) => c._id === item._id)
      );
      
      setCart(uniqueCart);
      localStorage.setItem("cart", JSON.stringify(uniqueCart));
      return { success: true };
    } catch (err) {
      console.log("Update cart error:", err.message);
      return { success: false, error: err.message };
    }
  };

  const clearCart = async () => {
    try {
      await clearCartAPI();
      setCart([]);
      localStorage.removeItem("cart");
      return { success: true };
    } catch (err) {
      console.log("Clear cart error:", err.message);
      return { success: false, error: err.message };
    }
  };

  // ---------------- ORDER OPERATIONS ----------------
  const fetchOrders = async () => {
    try {
      const res = await getOrder();
      setOrder(res.orders || []);
      return { success: true };
    } catch (err) {
      console.log("Fetch orders error:", err.message);
      return { success: false, error: err.message };
    }
  };

  const removeOrder = async (orderId) => {
    try {
      await removeOrderAPI(orderId);
      setOrder((prevOrders) => prevOrders.filter((o) => o._id !== orderId));
      return { success: true };
    } catch (err) {
      console.log("Remove order error:", err.message);
      return { success: false, error: err.message };
    }
  };

  return (
    <DataContext.Provider
      value={{
        user,
        loading,
        cart,
        wishlist,
        currentProduct,
        fetchProductById,
        login,
        logout,
        order,
        setOrder,
        products,
        setProducts,
        banner,
        setBanner,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        addToCart,
        removeFromCart,
        updateCart,
        clearCart,
        fetchOrders,
        removeOrder,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}