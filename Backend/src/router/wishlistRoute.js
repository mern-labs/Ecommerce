const express=require("express")
const { createWishList, removeFromWishlist, getWishlist } = require("../controller/wishListController")
const verifyToken = require("../middleware/auth")
const wishlistRouter=express.Router()


wishlistRouter.post("/add",verifyToken,createWishList)
wishlistRouter.post("/remove",verifyToken,removeFromWishlist)
wishlistRouter.post("/",verifyToken,getWishlist)




module.exports=wishlistRouter