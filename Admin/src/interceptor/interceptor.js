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
    }
    return Promise.reject(error);
  }
);


// ---------------Get user --------------
export const getUsers=async()=>{
  const res= await apiInstance.get("/api/get/users");
  return res
}


// ---------------------- Auth ----------------------
export const register = async ({ name, email, password }) => {
  const res = await apiInstance.post("/api/register", { name, email, password });
  return res;
};

export const login = async ({ email, password }) => {
  const res = await apiInstance.post("/api/login", { email, password });
  return res;
};

// // ---------------------- Products ----------------------
export const getProducts = async () => {
  const res = await apiInstance.get("/api/products");
  console.log(res);
  return res;
};

// -------------------------Add producsts --------------

export const createProduct = async (data) => {
  const res = await apiInstance.post("/api/products", data,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

// ----------------------Delete products-----------------
export const deleteProduct = async (productID) => {
  const res = await apiInstance.delete(`/api/products/delete/${productID}`)
  return res;
};

// -----------------------update products ----------------
export const updateProduct = async (id, updateData) => {
  try {
    const res = await apiInstance.put(
      `/api/products/update/${id}`,
      updateData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return res;
  } catch (error) {
    console.error("Update Product Error:", error);
    throw error;
  }
};


// --------------------------Get orders-------------------
export const getAllOrders=async()=>{
  const res=await apiInstance.get("/api/order/admin/orders")
  console.log(res.data);
  return res
}


//  ------------------------Delete User
export const deleteUser=async(id)=>{
  const res=await apiInstance.delete(`/api/delete/${id}`)
  return res
}

export const getContactMessage = async()=>{
  const res = await apiInstance.get("/api/contact")
  return res
}

export const deleteMessage=async(id)=>{
  const res=await apiInstance.delete(`/api/contact/${id}`)
  return res
}


export default apiInstance;
