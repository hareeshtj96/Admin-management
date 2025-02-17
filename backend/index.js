const express = require('express');
const cors = require('cors');
const connectToDB = require('./database/db');
const adminRoute = require('./routes/route');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

// Admin Routes
app.use("/api/admin", adminRoute);


app.listen(PORT, () => {
    connectToDB();
    console.log(`Server is listening on port ${PORT}`)
})