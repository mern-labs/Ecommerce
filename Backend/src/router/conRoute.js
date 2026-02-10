const express = require("express");
const verifyToken = require("../middleware/auth");
const { createContact, getContact, deleteContact } = require("../controller/conController");

const conRouter = express.Router();

conRouter.post("/contact",createContact);
conRouter.get("/contact", verifyToken, getContact);
conRouter.delete("/contact/:id", verifyToken, deleteContact);

module.exports = conRouter;
