// Import models
const scheduleModel = require('../models/schedule.model');
const sewerModel = require('../models/sewer.model');


// Import utils function
const { setHaveNewSchedule } = require('../utils/mqttFunction');

module.exports.getAll = async (req, res) => {
    try {
        // const schedules = await scheduleModel.find({}).lean();
        // console.log(schedules);
        // let sewerList = await sewerModel.find();
        // sewerList = sewerList.filter(element => {
        //     return element.
        // })
        // schedules.forEach( async element => {
        //     let temp = await sewerModel.findById(element.sewer, '_id name location.city location.district').lean();
        //     console.log(temp);
        //     element['sewers'] = temp;
        //  });
        //  console.log(schedules);
        // sewerList.forEach(async element => {
        //     schedules['sewer'] = await sewerModel.find({_id: element});
        // });
        const schedules = await scheduleModel.find({}).lean();
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
        setHaveNewSchedule(true);
        res.status(201).json("Set schedule successful!");
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

module.exports.deleteSchedule = async (req, res) => {
    try {
        const removedSchedule = await scheduleModel.remove({_id: req.params.scheduleId});
        res.status(200).json("Delete schedule successful!");
    } catch (err) {
        res.status(500).json({message: err});
    }
};