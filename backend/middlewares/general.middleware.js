// Import models
const locationModel = require('../models/location.model');

module.exports.isLocationNameAvailable = async (req, res, next) => {
    try {
        const locationFound = await locationModel.findOne({
            name: req.body.name
        });
        if (locationFound) return res.status(409).json({message: "City name exists"});
        next();
    } catch (err) {
        res.status(500).json({
            message: "Database query error"
        });
    }
};

module.exports.isDistrictNameAvailable = async (req, res, next) => {
    try {
        const districtFound = await locationModel.findOne({
            'district.name': req.body.name
        });
        if (districtFound) return res.status(409).json({message: "District name exists"});
        next();
    } catch (err) {
        res.status(500).json({
            message: "Database query error"
        });
    }
};