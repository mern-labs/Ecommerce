const express = require("express");
const bannerUploads = require("../middleware/bannerMulter");
const { createBanner } = require("../controller/bannerController");
const bannerRoutes = express.Router();

bannerRoutes.post("/banners",bannerUploads.single("file"), createBanner);


module.exports = bannerRoutes;