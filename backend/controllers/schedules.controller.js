// Import models
const scheduleModel = require('../models/schedule.model');


// Import utils function
const { setHaveNewSchedule } = require('../utils/mqttFunction');

module.exports.getAll = async (req, res) => {
    try {
        const schedules = await scheduleModel.find({}).populate('sewer', '_id name location.city location.district').lean();
        res.status(200).json(schedules);
    } catch (err) {
        res.status(500).json({
            message: "Database query error"
        });
    }
};

module.exports.getOneBySewer = async (req, res) => {
    try {
        const schedules = await scheduleModel.find({sewer: req.params.sewerId}).populate('sewer', '_id name location.city location.district').lean();
        res.status(200).json(schedules);
    } catch (err) {
        res.status(500).json({message: "Database query error"});
    };
};

module.exports.addSchedule = async (req, res) => {
    const schedule = new scheduleModel({
        date: req.body.date,
        time: req.body.time,
        action: req.body.action,
        sewer: req.body.sewer
    });
    try {
        const savedSchedule = await schedule.save();
        setHaveNewSchedule(true);
        res.status(201).json({message: "Set schedule successful!"});
    } catch (err) {
        res.status(500).json({
            message: "Database query error"
        });
    }
};

module.exports.deleteSchedule = async (req, res) => {
    try {
        const removedSchedule = await scheduleModel.deleteOne({_id: req.params.scheduleId});
        res.status(200).json({message: "Delete schedule successful!"});
    } catch (err) {
        res.status(500).json({message: "Database query error"});
    }
};