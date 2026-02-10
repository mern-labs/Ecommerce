import axios from "axios";

// ✅ CORRECT - baseURL includes /api
const apiInstance = axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL: "https://ecommerce-ri1d.onrender.com/api"
});

// ✅ Request interceptor
apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor - FIXED
apiInstance.interceptors.response.use(
  (response) => response.data,  // ✅ Return data directly
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

// ============================================
// BANNER
// ============================================
export const getBanner = async () => {
  const res = await apiInstance.get("/banners");  
  console.log("get banners",res);
  return res;
};

// ============================================
// AUTH
// ============================================
export const register = async ({ name, email, password }) => {
  const res = await apiInstance.post("/register", { name, email, password });   
  return res;
};

export const login = async ({ email, password }) => {
  const res = await apiInstance.post("/login", { email, password });  
  console.log("login",res);
  return res;
};

// ============================================
// PRODUCTS
// ============================================
export const getProducts = async () => {
  const res = await apiInstance.get("/products"); 
  return res;
};

export const getProductById = async (id) => {
  try {
    const res = await apiInstance.get(`/products/${id}`);  
    return res;
  } catch (err) {
    console.error("Get product by ID error:", err.message);
    throw err;
  }
};


// WISHLIST

export const getWishlist = async () => {
  const res = await apiInstance.get("/wishlist"); 
  console.log("whishlist",res);
  return res;
};

export const addWishlist = async (productId) => {
  const res = await apiInstance.post("/wishlist/add", { productId });  
  return res;
};

export const removeWishlist = async (productId) => {
  const res = await apiInstance.post("/wishlist/remove", { productId });  
  return res;
};

// ============================================
// CART - ✅ ALL RETURN res (not res.data)
// ============================================
export const addToCart = async (productId, quantity = 1) => {
  const res = await apiInstance.post("/addtocart/add", { productId, quantity }); 
  return res;  // ✅ Return res (not res.data)
};

export const getAddToCart = async () => {
  const res = await apiInstance.get("/addtocart"); 
  return res;  // ✅ Return res (not res.data)
};

export const removeFromCart = async (productId) => {
  const res = await apiInstance.post("/addtocart/remove", { productId });  
  return res;  // ✅ Return res (not res.data)
};

export const updateAddToCart = async (productId, quantity) => {
  const res = await apiInstance.put("/addtocart/update", { productId, quantity });  
  return res;  // ✅ Return res (not res.data)
};

export const clearAddToCart = async () => {
  const res = await apiInstance.delete("/addtocart/clear"); 
  return res;  // ✅ Return res (not res.data)
};

// ============================================
// ORDER - ✅ FIXED
// ============================================
export const makeOrder = async (orderData) => {
  try {
    console.log("📦 Making order:", orderData);
    const res = await apiInstance.post("/orders/add", orderData);  
    console.log("✅ Order created:", res);
    return res;
  } catch (error) {
    console.error("❌ Order error:", error);
    throw error;
  }
};

export const getOrder = async () => {
  const res = await apiInstance.get("/orders");  
  console.log("Orders from context",res);
  
  return res;
};

export const removeOrder = async (orderId) => {
  const res = await apiInstance.delete(`/orders/delete/${orderId}`);  
  return res;
};

// ============================================
// CONTACT
// ============================================
export const createMessage = async (data) => {
  const res = await apiInstance.post("/contact", data);  
  return res;
};

export default apiInstance;