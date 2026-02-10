const Product = require("../model/productModel");
const cloudinary = require("../config/cloudinary");

const createProduct = async (req, res) => {
  try {
    // Check if image file was uploaded
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: "Product image is required" 
      });
    }

    // Since you're using CloudinaryStorage with multer,
    // the file is already uploaded and req.file.path contains the Cloudinary URL
    const imageURL = req.file.path;

    // Create product with all fields
    const productData = {
      name: req.body.name,
      brand: req.body.brand,
      color: req.body.color,
      material: req.body.material,
      length: req.body.length,
      price: parseFloat(req.body.price),
      category: req.body.category,
      stock: parseInt(req.body.stock),
      ratings: req.body.ratings ? parseFloat(req.body.ratings) : 0,
      reviews: req.body.reviews ? parseInt(req.body.reviews) : 0,
      instock: req.body.instock === 'true' || req.body.instock === true,
      image: imageURL
    };

    const data = await Product.create(productData);

    res.status(201).json({ 
      success: true,
      message: "Product stored successfully", 
      data: data 
    });

  } catch (error) {
    console.error("Error creating product:", error.message);
    console.error("Error stack:", error.stack);
    
    // If product creation fails, delete the uploaded image from Cloudinary
    if (req.file && req.file.filename) {
      try {
        await cloudinary.uploader.destroy(req.file.filename);
      } catch (deleteError) {
        console.error("Error deleting image from Cloudinary:", deleteError);
      }
    }
    
    res.status(500).json({ 
      success: false,
      message: "Data not stored", 
      error: error.message 
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const data = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true,
      message: "Data fetched successfully", 
      data: data 
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ 
      success: false,
      message: "Data not found",
      error: error.message 
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      // If new image was uploaded but product not found, delete it
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      return res.status(404).json({ 
        success: false,
        message: "Product not found" 
      });
    }

    // Handle image upload
    if (req.file) {
      // Extract public_id from old Cloudinary URL to delete it
      if (product.image) {
        const urlParts = product.image.split('/');
        const publicIdWithExtension = urlParts[urlParts.length - 1];
        const publicId = `products/${publicIdWithExtension.split('.')[0]}`;
        
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (deleteError) {
          console.error("Error deleting old image:", deleteError);
        }
      }
      
      // Set new image URL
      product.image = req.file.path;
    }

    // Update fields (handle falsy values correctly)
    const updates = {
      name: req.body.name,
      brand: req.body.brand,
      color: req.body.color,
      material: req.body.material,
      length: req.body.length,
      price: req.body.price ? parseFloat(req.body.price) : undefined,
      category: req.body.category,
      stock: req.body.stock !== undefined ? parseInt(req.body.stock) : undefined,
      ratings: req.body.ratings ? parseFloat(req.body.ratings) : undefined,
      reviews: req.body.reviews ? parseInt(req.body.reviews) : undefined,
      instock: req.body.instock !== undefined ? 
        (req.body.instock === 'true' || req.body.instock === true) : undefined
    };

    // Only update fields that were provided
    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined) {
        product[key] = updates[key];
      }
    });

    await product.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    
    // If update fails and new image was uploaded, try to delete it
    if (req.file && req.file.filename) {
      try {
        await cloudinary.uploader.destroy(req.file.filename);
      } catch (deleteError) {
        console.error("Error deleting uploaded image:", deleteError);
      }
    }
    
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Delete associated image from Cloudinary
    if (product.image) {
      const urlParts = product.image.split('/');
      const publicIdWithExtension = urlParts[urlParts.length - 1];
      const publicId = `products/${publicIdWithExtension.split('.')[0]}`;
      
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (deleteError) {
        console.error("Error deleting image from Cloudinary:", deleteError);
      }
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { 
  createProduct, 
  getProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
};