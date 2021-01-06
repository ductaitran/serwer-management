const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    district: [{
        name: String,
        haveSewers: [String]
    }]
});

module.exports = mongoose.model("Locations", locationSchema);