const express = require("express");
const bannerUploads = require("../middleware/bannerMulter");
const { createBanner, getBanner } = require("../controller/bannerController");
const verifyToken = require("../middleware/auth");
const bannerRoutes = express.Router();

// Public route
bannerRoutes.get("/banners", getBanner);

// Protected route (admin only) - FIXED: Changed "file" to "image"
bannerRoutes.post("/banners", verifyToken, bannerUploads.single("image"), createBanner);

module.exports = bannerRoutes;