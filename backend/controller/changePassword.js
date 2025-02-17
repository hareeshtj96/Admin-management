const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
    try {
        const { newPassword, confirmPassword } = req.body;

        if (!newPassword || !confirmPassword) return res.status(400).json({ message: "Both password fields are required" });

        if (newPassword !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });

        // Get admin details from middleware
        const email = req.admin.email;

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);


        // Update admin password
        const adminCollection = mongoose.connection.collection("Admin");
        await adminCollection.updateOne(
            { email: email },
            { $set: { password: hashedPassword } }
        );

        return res.status(200).json({ message: "Password updated successfully!" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = changePassword;