const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    sewer: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Schedules", scheduleSchema);