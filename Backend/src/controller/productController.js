const Product = require("../model/productModel");


const createProduct = async(req,res)=>{
  try {
    const file=req.file ?req.file.filename : ""

    const data=await Product.create({
      ...req.body,
      image:file
    })
    res.status(200).json({message:"Product store succesfully",data:data})


  } catch (error) {
    console.log(error.message);
    res.status(500).json({message:"Data not stored"})
  }
}

const getProducts = async(req,res)=>{
  try {
    const data=await Product.find()
    res.status(200).json({message:"Data fetched sucessfully",data:data})
  } catch (error) {
    console.log(error.message);
    res.status(400).json({message:"Data not found"})
  }
}

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
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Admin

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
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

module.exports = {createProduct, getProducts, getProductById, updateProduct, deleteProduct}