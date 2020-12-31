// Import models
const sewerModel = require('../models/sewer.model');
const locationModel = require('../models/location.model');

// Import controllers
const passportController = require('../controllers/passport.controller');

module.exports.getAll = async (req, res) => {
    try {
        if (passportController.isAdmin) {
            const sewers = await sewerModel.find();
            return res.json(sewers);
        }
        const sewerList = await locationModel.findOne({
            name: req.user.location.city
        });
        console.log(sewerList);
        let trueSewerList;
        sewerList.district.forEach(element => {
            console.log(element);
            if (element.name === req.user.location.district) {
                trueSewerList = element.haveSewers;
            }
        });
        console.log(trueSewerList)
        const sewers = await sewerModel.find({
            _id: {
                $in: trueSewerList
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
        const sewer = await sewerModel.findById(req.params.sewerId);
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
        const sewers = await sewerModel.find({}).limit(pageOptions.limit).skip(pageOptions.limit * pageOptions.page);
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
        description: req.body.description,
        location: {
            city: req.body.city,
            district: req.body.district
        }
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
        const removedSewersInRole = await roleModel.updateMany({}, {
            $pullAll: {
                haveSewers: [req.params.sewerId]
            }
        });
        res.json(removedSewersInRole);
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};