const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    role: String
});

module.exports = mongoose.model("Users", userSchema);