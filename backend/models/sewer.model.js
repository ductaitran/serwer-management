const mongoose = require('mongoose');

const sewerSchema = mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true
    },
    description: String,
    location: {
        city: String,
        district: String
    }
});

module.exports = mongoose.model("Sewers", sewerSchema);