const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'User', 'Guest'],
        default: 'Guest'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    city: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Users", userSchema);