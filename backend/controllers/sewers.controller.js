// Import models
const sewerModel = require('../models/sewer.model');
const roleModel = require('../models/role.model');

module.exports.getAll = async (req, res) => {
    try {
        let sewerLists = await roleModel.findOne({name: req.user.role}, 'haveSewers');
        sewerLists = sewerLists.haveSewers;
        const sewers = await sewerModel.find( {_id: {$in: sewerLists} });
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
        res.json({message: err});
    };
};

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
        if (savedSewer) {
            const notUpdatedRole = await roleModel.findOneAndUpdate(
                { name: req.body.role },
                { $push: {haveSewers: savedSewer._id}}
            );
        }
        res.sendStatus(200);
    } catch (err) {
        res.json({
            message: err
        });
    }
};

module.exports.deleteSewer = async (req, res) => {
    try {
        const removedSewer = await sewerModel.remove({_id: req.params.sewerId});
        res.json(removedSewer);
    } catch (err) {
        res.json({message: err});
    }
};