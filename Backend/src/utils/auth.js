const jwt = require("jsonwebtoken");

const tokenGenerate = (user) => {
    return jwt.sign(
        {
            id: user._id,
            name: user.name,
            email: user.email
        },
        process.env.JWT_TOKEN,
        { expiresIn: "1d" }
    );
};

module.exports = tokenGenerate;
