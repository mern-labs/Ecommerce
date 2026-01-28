const userData = require("../model/userModel");
const bcrypt = require("bcrypt");
const tokenGenerate = require("../utils/auth");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Enter all details" });
        }

        const checkEmail = await userData.findOne({ email });
        if (checkEmail) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await userData.create({
            name,
            email,
            password: hashPassword
        });

        res.status(201).json({ message: "Registration success", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Registration failed" });
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
            data: { email: user.email, token },
        });
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
};

const getData = async (req, res) => {
    const user = await userData.findById(req.user.id);
    res.json({ message: "Verify Data", data: user });
};

module.exports = {register, login, getData};
