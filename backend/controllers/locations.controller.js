// Import models
const locationModel = require('../models/location.model');

module.exports.getAll = async (req, res) => {
    try {
        const locations = await locationModel.find({}, 'name district.name');
        res.json(locations);
    } catch (err) {
        res.status(500).json({
            message: "Database query error"
        });
    }
};

module.exports.getDistrictInCity = async (req, res) => {
    try {
        const location = await locationModel.findOne({name: req.params.city}).distinct('district.name').lean();
        res.json(location);
    } catch (err) {
        res.status(500).json({
            message: "Database query error"
        });
    }
};

module.exports.addLocation = async (req, res) => {
    try {
        const location = new locationModel({
            name: req.body.name,
            district: []
        });
        const savedLocation = await location.save();
        res.status(201).json({
            message: "Add location successful!"
        });
    } catch (err) {
        res.status(500).json({
            message: "Database query error"
        });
    }
};

module.exports.addDistrict = async (req, res) => {
    try {
        let temp = {
            name: req.body.name,
            haveSewers: []
        }
        const savedLocation = await locationModel.updateOne({name: req.body.city}, {
            $push: { district: temp }
        });
        res.status(201).json({
            message: "Add district successful!"
        });
    } catch (err) {
        res.status(500).json({
            message: "Database query error"
        });
    }
};

module.exports.deleteLocation = async (req, res) => {
    try {
        const removedLocation = await locationModel.deleteOne({
            name: req.params.name
        });
        res.status(200).json({
            message: "Delete location successful!"
        });
    } catch (err) {
        res.status(500).json({
            message: "Database query error"
        });
    }
};