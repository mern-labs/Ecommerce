import axios from "axios"

const apiInstance=axios.create({
  baseURL: "http://localhost:3000"
})


export const getBanner=async()=>{
  const res=await apiInstance.get("/api/banners")
  console.log(res.data);
  return res
}
