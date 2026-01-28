import axios from "axios"

const apiInstance=axios.create({
  baseURL: "http://localhost:3000"
})

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") // get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}` // attach token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// ✅ Optional: Response interceptor for error handling
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized → token invalid/expired
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login" // redirect to login
    }
    return Promise.reject(error)
  }
)

export const getBanner=async()=>{
  const res=await apiInstance.get("/api/banners")
  console.log(res.data);
  return res
}

export const register=async({name,email,password})=>{
  const res=await apiInstance.post("/api/register",{name,email,password})
  return res
}

export const login=async({email,password})=>{
  const res=await apiInstance.post("/api/login",{email,password})
  return res
}

export const getProducts=async()=>{
  const res=await apiInstance.get("/api/products")
  return res
}


export default apiInstance
