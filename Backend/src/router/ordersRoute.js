const express=require("express")
const verifyToken = require("../middleware/auth")
const orderUploads = require("../middleware/ordersMulter")
const { createOrder, getOrders, deleteOrder } = require("../controller/ordersController")
const orderRouter=express.Router()



orderRouter.post("/add",verifyToken,orderUploads.single("file"),createOrder)
orderRouter.get("/",verifyToken,getOrders)
orderRouter.delete("/delete",verifyToken,deleteOrder)


module.exports=orderRouter