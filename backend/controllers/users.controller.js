// Import model
const userModel = require('../models/user.model');

module.exports.getAll = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (err) {
        res.json({
            message: err
        });
    }
};

module.exports.getOne = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.json({message: err});
    };
};

module.exports.addUser = async (req, res) => {
    const user = new userModel({
        _id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({
            message: err
        });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const removedUser = await UserModel.remove({_id: req.params.userId});
        res.json(removedUser);
    } catch (err) {
        res.json({message: err});
    }
};