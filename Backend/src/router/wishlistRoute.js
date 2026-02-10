const express = require("express")
const { createWishList, removeFromWishlist, getWishlist } =
  require("../controller/wishlistController");

const verifyToken = require("../middleware/auth")
const wishlistRouter = express.Router()


wishlistRouter.post("/add", verifyToken, createWishList)
wishlistRouter.post("/remove", verifyToken, removeFromWishlist)
wishlistRouter.get("/", verifyToken, getWishlist)




module.exports = wishlistRouter