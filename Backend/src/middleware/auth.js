const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(403).json({ message: "No authorization found" });
        }

        const token = authorization.split(" ")[1];

        if (!token) {
            return res.status(400).json({ message: "Token not found" });
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = verifyToken;