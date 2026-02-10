const Banner = require("../model/bannerModel");

const createBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        message: "Banner image is required" 
      });
    }

    const banner = await Banner.create({
      image: req.file.path, // Cloudinary URL
      isTrue: req.body.isTrue !== undefined ? 
        (req.body.isTrue === 'true' || req.body.isTrue === true) : true
    });

    return res.status(201).json({
      message: "Banner created successfully",
      banner
    });
  } catch (error) {
    console.error("Create Banner Error:", error);
    return res.status(500).json({ 
      message: "Failed to create banner",
      error: error.message 
    });
  }
};

const getBanner = async (req, res) => {
  try {
    const banners = await Banner.find({ isTrue: true })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: banners.length,
      banners
    });
  } catch (error) {
    console.error("Get Banners Error:", error);
    return res.status(500).json({ 
      message: "Failed to fetch banners",
      error: error.message 
    });
  }
};

module.exports = { createBanner, getBanner };