const express = require('express');
const adminLogin = require("../controller/adminLogin");
const changePassword = require("../controller/changePassword");
const refreshTokenController = require("../controller/refreshTokenController");
const
    {
        getSalesByRegion,
        getSalesByMonth,
        getRecentSales,
        getTransactionDetails,
        getStats,
        getTotalSubscriptionByPlan
    } = require("../controller/salesController");

const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// Admin Login Route
router.post('/login', adminLogin);

// Refresh token route
router.post('/refreshToken', refreshTokenController);

// Change password Route
router.patch('/updatePassword', isAdmin, changePassword);

// Get sales by Region
router.get('/getByRegion', getSalesByRegion);

// Get sales by month
router.get('/getByMonth', getSalesByMonth);

// Get recent sales
router.get('/recentSales', getRecentSales);

// Get transaction details
router.get('/transaction', getTransactionDetails);

// Get stats
router.get('/getStats', getStats);

// Get total subscription by plan
router.get("/getByPlan", getTotalSubscriptionByPlan);

module.exports = router;
