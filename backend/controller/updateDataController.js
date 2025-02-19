const mongoose = require('mongoose');
const saleCollection = mongoose.connection.collection("Sale");

const updateDataController = async (req, res) => {
    try {
        const body = req.body;
        // destructure body
        const {
            plan,
            amount_paid,
            currency,
            status,
            region,
            start_date,
            end_date,
            last_active,
            cancellation_date,
            transactions,
            email
        } = body;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({ message: "Email is required to insert data" });
        }

        // Check if a record already exists for the given email
        const existingRecord = await saleCollection.findOne({ email });

        if (existingRecord) {
            return res.status(400).json({ message: "This email is already registered" });
        }

        // If email doesn't exist, insert a new record
        const newSale = {
            email,
            plan,
            amount_paid,
            currency,
            status,
            region,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
            last_active: new Date(last_active),
            cancellation_date: new Date(cancellation_date),
            transactions,
        };

        // Insert new record into the database
        await saleCollection.insertOne(newSale);

        return res.status(201).json({ message: "New sale data inserted successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = updateDataController;
