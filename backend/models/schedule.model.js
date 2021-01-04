const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    sewer: {
        type: String,
        required: true,
        ref: "Sewers"
    }
});

module.exports = mongoose.model("Schedules", scheduleSchema);