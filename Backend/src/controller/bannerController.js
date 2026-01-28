const Banner = require("../model/bannerModel");

const createBanner = async (req, res) => {
  try {
    const { isTrue } = req.body;
    const file=req.file ?req.file.filename : "";

    const banner = await Banner.create({
      image:file,
      isTrue
    });

    res.status(201).json({
      message: "Banner created successfully",
      banner
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getBanner = async (req, res) => {
  try {
    const banners = await Banner.find({ isTrue: true }).sort({ createdAt: -1 });

    res.status(200).json({
      count: banners.length,
      banners,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createBanner, getBanner}
