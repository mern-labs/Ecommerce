const AddToCart = require("../model/addtocartModel");



const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID required" });
    }

    let cart = await AddToCart.findOne({ user: userId });

    // 🟢 Create cart if not exists
    if (!cart) {
      cart = await AddToCart.create({
        user: userId,
        products: [{ product: productId, quantity }],
      });

      return res.status(201).json({
        message: "Product added to cart",
        cart,
      });
    }

    // 🔁 Check if product already exists
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex > -1) {
      // ➕ Increase quantity
      cart.products[productIndex].quantity += quantity;
    } else {
      // ➕ Add new product
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await AddToCart.findOne({ user: userId })
      .populate("products.product");

    if (!cart) {
      return res.status(200).json({
        products: [],
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID required" });
    }

    await AddToCart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId } } },
      { new: true }
    );

    res.status(200).json({
      message: "Product removed from cart",
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || quantity < 1) {
      return res.status(400).json({
        message: "Invalid product or quantity",
      });
    }

    const cart = await AddToCart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (!product) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    product.quantity = quantity;
    await cart.save();

    res.status(200).json({
      message: "Quantity updated",
      cart,
    });
  } catch (error) {
    console.error("Update quantity error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await AddToCart.findOneAndDelete({ user: userId });

    res.status(200).json({
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports={
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateQuantity
}