const mongoose = require("mongoose");

const saleCollection = mongoose.connection.collection("Sale");

// const total sales by region
const getSalesByRegion = async (req, res) => {
    try {
        const salesData = await saleCollection
            .aggregate([
                {
                    $group: {
                        _id: "$region",
                        totalSales: { $sum: 1 },
                        totalRevenue: { $sum: { $toDouble: "$amount_paid" } },
                    },
                },
            ])
            .toArray(); // return result in array

        if (salesData.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "No sales data found" });
        }
        return res.status(200).json({ success: true, data: salesData });
    } catch (error) {
        console.error("Error while fetching sales by region:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

// Get sales by month
const getSalesByMonth = async (req, res) => {
    try {
        // find the sale from transaaction array
        const salesData = await saleCollection
            .aggregate([
                { $unwind: "$transactions" },
                {
                    $addFields: {
                        transactionDate: { $toDate: "$transactions.date" }, // convert string to date
                    },
                },
                {
                    $group: {
                        _id: { $month: "$transactionDate" },
                        totalSales: { $sum: 1 },
                        totalRevenue: { $sum: { $toDouble: "$transactions.amount" } },
                    },
                },
                { $sort: { _id: 1 } },
            ])
            .toArray(); // return result in array

        return res.status(200).json({ success: true, data: salesData });
    } catch (error) {
        console.error("Error while fetching sales by month:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

// Get recent sales
const getRecentSales = async (req, res) => {
    try {
        const recentSales = await saleCollection
            .aggregate([
                { $unwind: "$transactions" },
                { $sort: { "transactions.date": -1 } },
                {
                    $group: {
                        _id: "$email",
                        latestTransaction: { $first: "$transactions" }, // get recent transaction
                    },
                },
            ])
            .toArray();

        return res.status(200).json({ success: true, data: recentSales });
    } catch (error) {
        console.error("Error while fetching recent sales data:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get User transaction details
const getTransactionDetails = async (req, res) => {
    try {
        const allTransactions = await saleCollection.find().toArray();

        const result = allTransactions
            .map((transaction) => {
                const { email, transactions: transactionList } = transaction;
                const transactionDetails = transactionList.map((t) => ({
                    email,
                    transactionStatus: t.status,
                    transactionAmount: t.amount,
                }));
                return transactionDetails;
            })
            .reduce((acc, curr) => acc.concat(curr), []);

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching transaction details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get stats
const getStats = async (req, res) => {
    try {
        const now = new Date();
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
        const currentMonth = now.getMonth();
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

        // Total Revenue
        const total = await saleCollection
            .aggregate([
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: { $toDouble: "$amount_paid" } },
                    },
                },
            ])
            .toArray();

        const totalRevenue = total[0]?.totalRevenue || 0;

        // Total Sales for current month
        const totalSalesCurrentMonth = await saleCollection
            .aggregate([
                {
                    $match: {
                        start_date: {
                            $gte: new Date(new Date().setMonth(currentMonth)),
                            $lt: new Date(new Date().setMonth(currentMonth + 1)),
                        },
                    },
                },
                { $unwind: "$transactions" },
                {
                    $match: {
                        "transactions.status": { $in: ["completed", "Success"] },
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalSales: { $sum: { $toDouble: "$transactions.amount" } },
                    },
                },
            ])
            .toArray();

        const currentMonthSales = totalSalesCurrentMonth[0]?.totalSales || 0;

        // Total Sales for previous month
        const totalSalesLastMonth = await saleCollection
            .aggregate([
                {
                    $match: {
                        start_date: {
                            $gte: new Date(new Date().setMonth(lastMonth)),
                            $lt: new Date(new Date().setMonth(lastMonth + 1)),
                        },
                    },
                },
                { $unwind: "$transactions" },
                {
                    $match: {
                        "transactions.status": { $in: ["completed", "Success"] },
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalSales: { $sum: { $toDouble: "$transactions.amount" } },
                    },
                },
            ])
            .toArray();

        const lastMonthSales = totalSalesLastMonth[0]?.totalSales || 0;

        // Calculate surplus
        const surplus = currentMonthSales - lastMonthSales;

        // Active subscriptions
        const activeSubscriptions = await saleCollection.countDocuments({
            status: "active",
        });

        // Active now
        const activeNow = await saleCollection.countDocuments({
            last_active: { $gte: oneHourAgo },
        });

        res.json({
            totalRevenue,
            activeNow,
            activeSubscriptions,
            totalSales: surplus,
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// get subscription amount by plan type
const getTotalSubscriptionByPlan = async (req, res) => {
    try {
        const totalByPlan = await saleCollection
            .aggregate([
                { $unwind: "$transactions" },
                {
                    $group: {
                        _id: {
                            month: { $month: { $toDate: "$transactions.date" } },
                            plan: "$plan",
                        },
                        totalAmount: { $sum: { $toDouble: "$transactions.amount" } },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        month: "$_id.month",
                        plan: "$_id.plan",
                        totalAmount: 1,
                    },
                },
                { $sort: { month: 1 } },
            ])
            .toArray();

        // Restructure the data
        const restructuredData = totalByPlan.reduce((acc, curr) => {
            let monthEntry = acc.find((entry) => entry.month === curr.month);

            if (!monthEntry) {
                monthEntry = {
                    month: curr.month,
                    premiumAmount: 0,
                    standardAmount: 0,
                    basicAmount: 0,
                };
                acc.push(monthEntry);
            }

            if (curr.plan === "Premium") {
                monthEntry.premiumAmount = curr.totalAmount;
            } else if (curr.plan === "Standard") {
                monthEntry.standardAmount = curr.totalAmount;
            } else if (curr.plan === "Basic") {
                monthEntry.basicAmount = curr.totalAmount;
            }
            return acc;
        }, []);

        return res.status(200).json({ success: true, data: restructuredData });
    } catch (error) {
        console.error("Error while fetching sunscription data by plan:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// get sales report data
const getSalesReport = async (req, res) => {
    try {
        const transactions = await saleCollection
            .aggregate([
                { $unwind: "$transactions" },
                {
                    $sort: { "transactions.last_active": -1 },
                },
                {
                    $group: {
                        _id: "$email",
                        email: { $first: "$email" },
                        region: { $first: "$region" },
                        amount: { $first: "$transactions.amount" },
                        plan: { $first: "$plan" },
                        last_active: { $first: "$last_active" },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        email: 1,
                        region: 1,
                        amount: 1,
                        plan: 1,
                        last_active: 1,
                    },
                },
            ])
            .toArray();

        res.json({ success: true, data: transactions });
    } catch (error) {
        console.error("Error fetching sales report:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getSalesByRegion,
    getSalesByMonth,
    getRecentSales,
    getTransactionDetails,
    getStats,
    getTotalSubscriptionByPlan,
    getSalesReport,
};
