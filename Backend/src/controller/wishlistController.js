const Wishlist = require("../model/wishLishModel")


const createWishList = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId } = req.body

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $addToSet: { products: productId } },
      { new: true, upsert: true }
    )

    res.status(200).json({
      message: "Product added to wishlist",
      wishlist
    })
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    })
  }
}

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id })
      .populate("products")

    res.status(200).json(wishlist || { products: [] })
  } catch (error) {
    res.status(500).json({
      message: "Failed to get wishlist",
      error: error.message
    })
  }
}

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId } = req.body

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $pull: { products: productId } },
      { new: true }
    )

    res.status(200).json({
      message: "Product removed from wishlist",
      wishlist
    })
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    })
  }
}

module.exports = {
  createWishList,
  getWishlist,
  removeFromWishlist
}
