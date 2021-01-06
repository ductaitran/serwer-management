const bcrypt = require('bcrypt');
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
        const user = await userModel.findOne({
            email: req.params.userEmail
        });
        res.json(user);
    } catch (err) {
        res.json({
            message: err
        });
    };
};

module.exports.addUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
            location: {
                city: req.body.location.city,
                district: req.body.location.district
            }
        });
        const savedUser = await user.save();
        res.status(201).json({
            message: "Add user successful!"
        });
    } catch (err) {
        res.json({
            message: err
        });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const removedUser = await userModel.deleteOne({
            email: req.params.userEmail
        });
        res.status(200).json({
            message: "Delete user successful!"
        });
    } catch (err) {
        res.json({
            message: err
        });
    }
};

module.exports.getAllRole = async (req, res) => {
    try {
        const roles = await userModel.schema.path('role').enumValues;
        res.status(200).json(roles);
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const updatedUser = await userModel.updateOne({
            email: req.params.userEmail
        }, {
            $set: {
                name: req.body.name,
                password: hashedPassword,
                city: req.body.city,
                role: req.body.role
            }
        });
        res.json({
            message: "Update user successful!"
        })
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};