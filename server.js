const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./utils/db");
const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/notesRoutes");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const morgan = require("morgan");

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
}));

app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try agian later."
})
app.use(limiter);

app.use(mongoSanitize());

app.use(xss());

if (process.env.NODE_ENV !== "test") {
    app.use(morgan("dev"));
}

app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
})

const PORT = process.env.PORT || 5000;

connectDB()
.then(() => {
    app.listen((PORT), () => {
        console.log(`Server running on port ${PORT}`);
    })
}) 
.catch((err) => {
    console.error(`There was an error connecting to DB ${err.message}`);
})