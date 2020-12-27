// Import models
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
        const user = await userModel.findOne(req.params.userEmail);
        res.json(user);
    } catch (err) {
        res.json({message: err});
    };
};

module.exports.addUser = async (req, res) => {
    const user = new userModel({
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
        const removedUser = await UserModel.remove({email: req.body.email});
        res.sendStatus(200);
    } catch (err) {
        res.json({message: err});
    }
};