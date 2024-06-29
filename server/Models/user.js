const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        unique: true,
        max: 50,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        max: 80,
    },
    password: {
        type: String,
        required: true,
        min: 8, 
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;