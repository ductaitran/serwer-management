// Import models
const sewerModel = require('../models/sewer.model');
const locationModel = require('../models/location.model');

// Import controllers
const passportController = require('../controllers/passport.controller');

module.exports.getAll = async (req, res) => {
    try {
        if (passportController.isAdmin(req.user.role)) {
            const sewers = await sewerModel.find();
            return res.json(sewers);
        }
        const sewerList = await getSewerByLocation(req.user.location.city);
        const sewers = await sewerModel.find({_id: { $in: sewerList }});
        res.json(sewers);
    } catch (err) {
        res.json({
            message: err
        });
    }
};

module.exports.getOne = async (req, res) => {
    try {
        // Check user is "Admin" or not, if true, return all sewer.
        if (passportController.isAdmin(req.user.role)) {
            const sewers = await sewerModel.findById(req.params.sewerId);
            return res.json(sewers);
        }
        // If user is not "Admin", return sewer in user's location.
        const sewerList = await getSewerByLocation(req.user.location.city);
        let sewer = await sewerModel.find({_id: { $in: sewerList }});
        sewer = sewer.filter(element => {
            return element._id === req.params.sewerId;
        });
        if(sewer.length == 0) return res.status(400).json("Not found!");
        res.json(sewer);
    } catch (err) {
        res.json({
            message: err
        });
    };
};

module.exports.getLimit = async (req, res) => {
    // Set paginating option
    const pageOptions = {
        page: parseInt(req.params.page, 10) || 0,
        limit: parseInt(req.params.limit, 10) || 10
    }
    try {
        // Check user is "Admin" or not, if true, return all sewer with limit option.
        if (passportController.isAdmin(req.user.role)) {
            const sewers = await sewerModel.find().limit(pageOptions.limit).skip(pageOptions.limit * pageOptions.page);
            return res.json(sewers);
        }
        const sewerList = await getSewerByLocation(req.user.location.city);
        const sewers = await sewerModel.find({_id: { $in: sewerList }}).limit(pageOptions.limit).skip(pageOptions.limit * pageOptions.page);
        res.json(sewers);
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
}

module.exports.addSewer = async (req, res) => {
    const sewer = new sewerModel({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description
    });
    try {
        const savedSewer = await sewer.save();
        res.sendStatus(200);
    } catch (err) {
        res.json({
            message: err
        });
    }
};

module.exports.deleteSewer = async (req, res) => {
    try {
        // Remove sewer in sewers collection
        const removedSewer = await sewerModel.deleteOne({
            _id: req.params.sewerId
        });
        if (!removedSewer) return res.status(500).json("Cannot delete this sewer!");
        // Remove sewer from all location collections have it
        const removedSewersInLocation = await location.updateMany({}, {
            $pullAll: {
                haveSewers: [req.params.sewerId]
            }
        });
        res.json(removedSewersInLocation);
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

getSewerByLocation = async (city) => {
    // Return list of sewer by city name
    const cityList = await locationModel.findOne({
        name: city
    }, 'district.haveSewers');
    let sewerList = [], realSewerList = [];
    cityList['district'].forEach(element => {
        sewerList = sewerList.concat(element.haveSewers);
    });
    sewerList.forEach(element => {
        if (!realSewerList.includes(element)) {
            realSewerList.push(element);
        };
    });
    return realSewerList;
}