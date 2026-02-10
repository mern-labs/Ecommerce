const express = require("express");
const productRoute = express.Router();
const { 
  createProduct, 
  getProducts, 
  getProductById, 
  deleteProduct, 
  updateProduct 
} = require("../controller/productController");
const productUploads = require("../middleware/productMulter");
const verifyToken = require("../middleware/auth");

// Public routes
productRoute.get("/products", getProducts);
productRoute.get("/products/:id", getProductById);

// Protected routes (admin only)
productRoute.post("/products", verifyToken, productUploads.single('image'), createProduct);
productRoute.put("/products/:id", verifyToken, productUploads.single("image"), updateProduct);
productRoute.delete("/products/:id", verifyToken, deleteProduct);

module.exports = productRoute;