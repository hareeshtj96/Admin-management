const jwt = require('jsonwebtoken');

const generateAccessToken = (adminId, email, role) => {
    return jwt.sign(
        { id: adminId, email, role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );
};

const generateRefreshToken = (adminId, email, role) => {
    return jwt.sign(
        { id: adminId, email, role },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "3d" }
    );
};

module.exports = { generateAccessToken, generateRefreshToken };