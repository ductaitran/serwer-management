// Import models
const scheduleModel = require('../models/schedule.model');

module.exports.getAll = async (req, res) => {
    try {
        const schedules = await scheduleModel.find({});
        res.status(200).json(schedules);
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

module.exports.getOneBySewer = async (req, res) => {
    try {
        const schedules = await scheduleModel.find({sewer: req.params.sewerId});
        res.status(200).json(schedules);
    } catch (err) {
        res.status(500).json({message: err});
    };
};

module.exports.addSchedule = async (req, res) => {
    const schedule = new scheduleModel({
        _id: req.body.id,
        date: req.body.date,
        time: req.body.time,
        action: req.body.action,
        sewer: req.body.sewer
    });
    try {
        const savedSchedule = await schedule.save();
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

module.exports.deleteSchedule = async (req, res) => {
    try {
        const removedSchedule = await scheduleModel.remove({_id: req.params.scheduleId});
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({message: err});
    }
};