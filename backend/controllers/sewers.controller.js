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
        const sewerList = await getSewerByLocation(req.user.location.city, req.user.location.district);
        const sewers = await sewerModel.find({
            _id: {
                $in:sewerList
            }
        });
        res.json(sewers);
    } catch (err) {
        res.json({
            message: err
        });
    }
};

module.exports.getOne = async (req, res) => {
    try {
        if (passportController.isAdmin(req.user.role)) {
            const sewers = await sewerModel.findById(req.params.sewerId);
            return res.json(sewers);
        }
        const sewerList = await getSewerByLocation(req.user.location.city, req.user.location.district);
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
    const pageOptions = {
        page: parseInt(req.params.page, 10) || 0,
        limit: parseInt(req.params.limit, 10) || 10
    }
    try {
        if (passportController.isAdmin(req.user.role)) {
            const sewers = await sewerModel.find().limit(pageOptions.limit).skip(pageOptions.limit * pageOptions.page);
            return res.json(sewers);
        }
        const sewerList = await getSewerByLocation(req.user.location.city, req.user.location.district);
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
        const removedSewer = await sewerModel.deleteOne({
            _id: req.params.sewerId
        });
        if (!removedSewer) return res.status(500).json("Cannot delete this sewer!");
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

getSewerByLocation = async (city, district) => {
    const sewerList = await locationModel.findOne({
        name: city
    });
    let trueSewerList;
    sewerList.district.forEach(element => {
        if (element.name === district) {
            trueSewerList = element.haveSewers;
        }
    });
    return trueSewerList;
}