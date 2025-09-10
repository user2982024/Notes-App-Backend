const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Creating the user
router.post("/dummy", async (req, res, next) => {
    try {
        const user = new User ({
            name: "Abrar",
            email: "ab@ab.com",
            password: "1q2wcd56"
        })
        await user.save();
        res.json({ message: "Dummy user created!" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;