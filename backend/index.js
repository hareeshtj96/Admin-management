const express = require('express');
const cors = require('cors');
const connectToDB = require('./database/db');
const adminRoute = require('./routes/route');
const dotenv = require('dotenv');
dotenv.config();

// PORT
const PORT = process.env.PORT || 5000;

const app = express();

// Cors allowed origin
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS.split(',');

const corsOption = {
    origin: allowedOrigins,
    method: ['Get', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}

app.use(cors(corsOption));
app.use(express.json());

// Admin Routes
app.use("/api/admin", adminRoute);


app.listen(PORT, () => {
    connectToDB();
    console.log(`Server is listening on port ${PORT}`)
})