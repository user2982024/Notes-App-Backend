const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/users", userRoutes);

connectDB()
.then(() => {
    app.listen((PORT), () => {
        console.log(`Server running on port ${PORT}`);
    })
}) 
.catch((err) => {
    console.error(`There was an error connecting to DB ${err.message}`);
})