// userController.js - Better error handling
const userData = require("../model/userModel");
const bcrypt = require("bcryptjs");
const tokenGenerate = require("../utils/auth");
const { sendWelcomeEmail } = require("../utils/sendMail");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Enter all details" });
    }

    const checkEmail = await userData.findOne({ email });
    if (checkEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // Try to send email but don't fail registration if email fails
    try {
      await sendWelcomeEmail(email, name);
    } catch (emailError) {
      console.error("⚠️ Failed to send welcome email, but continuing registration:", emailError.message);
      // Don't throw - allow registration to complete even if email fails
    }

    const user = await userData.create({
      name,
      email,
      password: hashPassword,
      role
    });

    res.status(201).json({ message: "Registration success", user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await userData.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = tokenGenerate(user);

    res.status(200).json({
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

module.exports = { register, login };