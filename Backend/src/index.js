const express=require("express")
const cors =require("cors")
const dbConnected = require("./config/db");
const bannerRoutes = require("./router/bannerRoute");
require("dotenv").config()
const app=express();
app.use(express.json())
app.use(cors())

app.use("/uploads",express.static("uploads"))

app.use("/api",bannerRoutes)


dbConnected()

const PORT=process.env.PORT
app.listen(PORT,()=>{
  console.log(`server is running on ${PORT}`);
  
})