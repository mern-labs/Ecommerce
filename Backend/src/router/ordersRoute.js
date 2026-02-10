const express = require("express");
const verifyToken = require("../middleware/auth");
const { createOrder, getOrders, deleteOrder, getOrderById } = require("../controller/ordersController");
const isAdmin = require("../middleware/adminAuth");
const { getAllOrdersAdmin } = require("../controller/adminOrderController");
const orderRouter = express.Router();

// ⚠️ IMPORTANT: Admin routes MUST come before /:id routes to prevent route conflicts
// Otherwise, "admin" will be treated as an ID and cause 404 errors

// User Routes
orderRouter.post("/add", verifyToken, createOrder);
orderRouter.get("/", verifyToken, getOrders);

// 🔴 ADMIN ROUTES - MUST BE BEFORE /:id
orderRouter.get("/admin/orders", verifyToken, isAdmin, getAllOrdersAdmin);

// ✅ SPECIFIC ROUTES - AFTER general routes
orderRouter.get("/:id", verifyToken, getOrderById);
orderRouter.delete("/delete/:id", verifyToken, deleteOrder);

module.exports = orderRouter;