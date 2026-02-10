const Order = require("../model/ordersModel");

const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, userDetails, paymentMethod } = req.body;

    // 🔒 Validation - Items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Order items are required" 
      });
    }

    // 🔒 Validation - Total Amount
    if (!totalAmount || typeof totalAmount !== "number" || totalAmount <= 0) {
      return res.status(400).json({ 
        success: false,
        message: "Valid total amount is required" 
      });
    }

    // 🔒 Validation - User Details
    if (!userDetails || typeof userDetails !== "object") {
      return res.status(400).json({ 
        success: false,
        message: "User details are required" 
      });
    }

    // 🔒 Destructure user details
    const { name, email, phone, address, city, state, pincode, country } = userDetails;


    // 🔒 Check all required fields
    if (!name || !name.trim()) {
      return res.status(400).json({ 
        success: false,
        message: "Name is required" 
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ 
        success: false,
        message: "Email is required" 
      });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({ 
        success: false,
        message: "Phone is required" 
      });
    }

    if (!address || !address.trim()) {
      return res.status(400).json({ 
        success: false,
        message: "Delivery address is required" 
      });
    }

    if (!pincode || !pincode.trim()) {
      return res.status(400).json({ 
        success: false,
        message: "Pincode is required" 
      });
    }

    // 🔒 Validate Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid email format" 
      });
    }

    // 🔒 Validate Phone Number (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    const phoneDigitsOnly = phone.trim().replace(/\D/g, "");
    if (!phoneRegex.test(phoneDigitsOnly)) {
      return res.status(400).json({ 
        success: false,
        message: "Phone number must be 10 digits" 
      });
    }

    // 🔒 Validate Pincode (6 digits)
    const pincodeRegex = /^[0-9]{6}$/;
    const pincodeDigitsOnly = pincode.trim().replace(/\D/g, "");
    if (!pincodeRegex.test(pincodeDigitsOnly)) {
      return res.status(400).json({ 
        success: false,
        message: "Pincode must be 6 digits" 
      });
    }

    // Create Order
    const order = await Order.create({
      user: req.user.id, // from verifyToken
      items: items.map((item) => ({
        product: item.product,
        quantity: item.quantity || 1,
        price: item.price,
      })),
      totalAmount,
      userDetails: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phoneDigitsOnly,
        address: address.trim(),
        city: city ? city.trim() : "",
        state: state ? state.trim() : "",
        pincode: pincodeDigitsOnly,
        country: country || "India",
      },
      paymentMethod,
      orderFile: req.file ? req.file.path : null, // optional
    });


    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Server error", 
      error: error.message 
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ 
        success: false,
        message: "Order not found" 
      });
    }

    // 🔐 Allow only owner or admin
    if (
      order.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ 
        success: false,
        message: "Not authorized" 
      });
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

// Get single order details
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product", "name price image")
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({ 
        success: false,
        message: "Order not found" 
      });
    }

    // 🔐 Allow only owner or admin
    if (
      order.user._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ 
        success: false,
        message: "Not authorized" 
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  deleteOrder,
  getOrderById,
};