import axios from "axios"

const apiInstance=axios.create({
  baseURL: "http://localhost:3000"
})


export const getBanner=async()=>{
  const res=await apiInstance.get("/api/banners")
  console.log(res.data);
  return res
}

export const register=async({name,email,password})=>{
  const res=await apiInstance.post("/register",{name,email,password})
  return res
}

export const login=async({email,password})=>{
  const res=await apiInstance.post("/login",{email,password})
  return res
}

export default apiInstance
