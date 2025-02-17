const express = require('express');
const adminLogin = require("../controller/adminLogin");
const changePassword = require("../controller/changePassword");
const refreshTokenController = require("../controller/refreshTokenController");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// Admin Login Route
router.post('/login', adminLogin);

// Change password Route
router.patch('/updatePassword', isAdmin, changePassword);

// Refresh token route
router.post('/refreshToken', refreshTokenController);

module.exports = router;
