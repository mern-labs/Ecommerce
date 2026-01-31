import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:3000",
});

// ✅ Request interceptor to attach token
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

// ✅ Response interceptor for unauthorized handling
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login"; // redirect to login
    }
    return Promise.reject(error);
  }
);

// ---------------------- Banner ----------------------
export const getBanner = async () => {
  const res = await apiInstance.get("/api/banners");
  console.log(res.data);
  return res;
};

// ---------------------- Auth ----------------------
export const register = async ({ name, email, password }) => {
  const res = await apiInstance.post("/api/register", { name, email, password });
  return res;
};

export const login = async ({ email, password }) => {
  const res = await apiInstance.post("/api/login", { email, password });
  return res;
};

// ---------------------- Products ----------------------
export const getProducts = async () => {
  const res = await apiInstance.get("/api/products");
  return res;
};


// Get product by ID
export const getProductById = async (id) => {
  try {
    const res = await apiInstance.get(`/api/products/${id}`);
    return res.data; // will contain { success: true, product: {...} }
  } catch (err) {
    console.error("Get product by ID error:", err.message);
    throw err;
  }
};

// ---------------------- Wishlist ----------------------
export const getWishlist = async () => {
  const res = await apiInstance.get("/api/wishlist");
  console.log("Wishlist",res);
  return res;
};

// Add product to wishlist
export const addWishlist = async (productId) => {
  const res = await apiInstance.post("/api/wishlist/add", { productId });
  return res;
};

// Remove product from wishlist
export const removeWishlist = async (productId) => {
  const res = await apiInstance.post("/api/wishlist/remove", { productId });
  return res;
};


// ✅ Add to cart
export const addToCart = async (productId, quantity = 1) => {
  const res = await apiInstance.post(
    "/api/addtocart/add",
    { productId, quantity }
  );
  return res.data;
};


// ✅ Get cart
export const getAddToCart = async () => {
  const res = await apiInstance.get("/api/addtocart");
  return res.data;
};


// ✅ Remove from cart
export const removeFromCart = async (productId) => {
  const res = await apiInstance.post(
    "/api/addtocart/remove",
    { productId }
  );
  return res.data;
};


// ✅ Update quantity
export const updateAddToCart = async (productId, quantity) => {
  const res = await apiInstance.put(
    "/api/addtocart/update",
    { productId, quantity }
  );
  return res.data;
};


// ✅ Clear cart
export const clearAddToCart = async () => {
  const res = await apiInstance.delete("/api/addtocart/clear");
  return res.data;
};


// ---------------------- Export axios instance ----------------------
export default apiInstance;
