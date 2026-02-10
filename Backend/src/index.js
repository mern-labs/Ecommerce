require("dotenv").config()
const express=require("express")
const cors =require("cors")
const dbConnected = require("./config/db");
const bannerRoutes = require("./router/bannerRoute");
const userRoutes = require("./router/userRoutes");
const productRoute = require("./router/productRoute");
const wishlistRouter = require("./router/wishlistRoute");
const addtocartRouter = require("./router/addtocartRoute");
const orderRouter = require("./router/ordersRoute");
const conRouter = require("./router/conRoute");
const app=express();
app.use(express.json())

// Allow all origins for development
app.use(cors())

app.use(express.urlencoded({ extended: true }));

app.use("/uploads",express.static("uploads"))

app.use("/api",bannerRoutes)
app.use("/api", userRoutes)
app.use("/api",productRoute)
app.use("/api/wishlist",wishlistRouter)
app.use("/api/addtocart",addtocartRouter)
app.use("/api/orders",orderRouter)
app.use("/api",conRouter)



dbConnected()

const PORT=process.env.PORT
app.listen(PORT,()=>{
  console.log(`server is running on ${PORT}`);
  
})