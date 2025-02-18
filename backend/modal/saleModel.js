const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["completed", "pending", "failed"],
        required: true
    }
});

const saleSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    plan: { type: String, enum: ["Basic", "Standard", "Premium"], required: true },
    amount_paid: { type: Number, required: true },
    currency: { type: String, enum: ["USD", "EUR", "INR"], required: true },
    status: { type: String, enum: ["active", "expired", "canceled"], required: true },
    region: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    last_active: { type: Date, required: false },
    cancellation_date: { type: Date, required: false },
    transactions: { type: [transactionSchema], required: true },
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;

