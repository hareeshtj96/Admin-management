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
        getTotalSubscriptionByPlan,
        getSalesReport
    } = require("../controller/salesController");

const updateDataController = require('../controller/updateDataController');

const isAdmin = require("../middleware/isAdmin");

const router = express.Router();




// Admin Login Route
router.post('/login', adminLogin);

// Refresh token route
router.post('/refreshToken', refreshTokenController);

// Change password Route
router.patch('/updatePassword', isAdmin, changePassword);

// Get sales by Region Route
router.get('/getByRegion', getSalesByRegion);

// Get sales by month Route
router.get('/getByMonth', getSalesByMonth);

// Get recent sales Route
router.get('/recentSales', getRecentSales);

// Get transaction details Route
router.get('/transaction', getTransactionDetails);

// Get stats Route
router.get('/getStats', getStats);

// Get total subscription by plan Route
router.get('/getByPlan', getTotalSubscriptionByPlan);

// Get sales report Route
router.get('/getReport', getSalesReport);

// Update database Route
router.put('/updateData', isAdmin, updateDataController);

module.exports = router;
