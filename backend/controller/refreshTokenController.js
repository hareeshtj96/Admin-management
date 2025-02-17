const jwt = require('jsonwebtoken');
const { generateAccessToken } = require("../utils/generateToken")

const refreshTokenController = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json({ message: "Unauthorized: No refresh token provided" });

    try {
        //verify refresh token
        const decodedToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        // Generate new access token
        const newAccessToken = generateAccessToken(decodedToken.id, decodedToken.email, decodedToken.role);

        res.json({ accessToken: newAccessToken })

    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid refresh token" });
    }
}

module.exports = refreshTokenController;