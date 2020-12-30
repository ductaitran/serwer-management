const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    haveSewers: {
        type: [String],
        default: undefined
    }
});

module.exports = mongoose.model("Roles", roleSchema);