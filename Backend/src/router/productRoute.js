const express = require("express");
const productRoute = express.Router();
const { createProduct, getProducts } = require("../controller/productController");
const productUploads = require("../middleware/productMulter");

productRoute.post("/products",productUploads.single('file'), createProduct);
productRoute.get("/products",getProducts);


module.exports = productRoute;
