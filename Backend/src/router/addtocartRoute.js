const express = require("express");
const addtocartRouter = express.Router();
const verifyToken = require("../middleware/auth");


const {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = require("../controller/addtocartController");

addtocartRouter.post("/add", verifyToken, addToCart);
addtocartRouter.get("/", verifyToken, getCart);
addtocartRouter.post("/remove", verifyToken, removeFromCart);
addtocartRouter.put("/update", verifyToken, updateQuantity);
addtocartRouter.delete("/clear", verifyToken, clearCart);

module.exports = addtocartRouter;
