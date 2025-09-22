const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200
    }, 
    text: {
        type: String,
        required: true,
        trim: true,
        maxLength: 1500
    }
}, { timestamps: true } );

module.exports = mongoose.model("Note", noteSchema);