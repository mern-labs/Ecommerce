const express = require("express");
const bannerUploads = require("../middleware/bannerMulter");
const { createBanner, getBanner } = require("../controller/bannerController");
const bannerRoutes = express.Router();

bannerRoutes.post("/banners",bannerUploads.single("file"), createBanner);
bannerRoutes.get("/banners", getBanner);


module.exports = bannerRoutes;