const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    name: String,
    district: [{
        name: String,
        haveSewers: [String]
    }]
});

module.exports = mongoose.model("Locations", locationSchema);