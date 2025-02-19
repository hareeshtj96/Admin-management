const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');

// Admin Login 
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Validate input
        if (!email || !password) return res.status(400).json({ message: "Email and Password are required" });

        // Admin Collection
        const adminCollection = mongoose.connection.collection("Admin");

        // Find Admin
        const admin = await adminCollection.findOne({ email });

        if (!admin) return res.status(404).json({ message: "Admin not found" });

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) return res.status(401).json({ message: "Invalid Password" });

        // Generate token
        const accessToken = generateAccessToken(admin._id, admin.email, admin.role);
        const refreshToken = generateRefreshToken(admin._id, admin.email, admin.role);


        res.status(200).json({
            message: "Login Successful",
            admin: {
                name: admin.name,
                email: admin.email,
                role: admin.role,
                accessToken,
                refreshToken
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })

    }
}

module.exports = adminLogin;