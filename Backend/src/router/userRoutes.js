const express = require("express");
const { register, login } = require("../controller/userController");
const verifyToken = require("../middleware/auth");
const isAdmin = require("../middleware/adminAuth");
const { getAllUsers, deleteUser } = require("../controller/adminUserController");

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);


userRoutes.get("/get/users", verifyToken , isAdmin, getAllUsers);
userRoutes.delete("/delete/:id", verifyToken, isAdmin, deleteUser);

module.exports = userRoutes;
