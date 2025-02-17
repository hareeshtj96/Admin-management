const mongoose = require('mongoose');


const connectToDB = async () => {
    try {
        const url = process.env.MONGO_URI
        await mongoose.connect(url)
        console.log("Database connected");
    } catch (error) {
        console.error("Error occured while connecting MongoDB:", error);
    }
}

module.exports = connectToDB;