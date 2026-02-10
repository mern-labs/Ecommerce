const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const bannerStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "banners",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const bannerUploads = multer({ 
  storage: bannerStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPG, PNG, and WebP are allowed!"), false);
    }
  }
});

module.exports = bannerUploads;