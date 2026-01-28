const express = require("express");
const { register, login, getData} = require("../controller/userController");
const verifyToken = require("../middleware/auth");

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);

userRoutes.get("/get", verifyToken, getData);


module.exports = userRoutes;
