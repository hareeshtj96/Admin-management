const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
    try {
        // get token from headers
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

        // verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const email = decodedToken.email;

        if (!email) return res.status(400).json({ message: "Invalid token: No email found" })

        // find admin by accessing mongo collection
        const adminCollection = mongoose.connection.collection("Admin");

        const admin = await adminCollection.findOne({ email });

        if (!admin) return res.status(404).json({ message: "Admin not found" });

        req.admin = admin;
        next();
    } catch (error) {
        if (error === "TokenExpiredError") {
            return res.status(401).json({ message: "Unauthorized: Token has expired" });
        } else {
            console.error("Token verification error:", error);
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
    }
};

module.exports = isAdmin;