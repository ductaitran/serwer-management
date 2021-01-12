const bcrypt = require('bcrypt');
const sewerModel = require('../models/sewer.model');
// Import models
const userModel = require('../models/user.model');

module.exports.getAll = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (err) {
        res.json({
            message: "Database query error"
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
            message: "Database query error"
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
            message: "Database query error"
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
            message: "Database query error"
        });
    }
};

module.exports.getAllRole = async (req, res) => {
    try {
        const roles = await userModel.schema.path('role').enumValues;
        res.status(200).json(roles);
    } catch (err) {
        res.status(500).json({
            message: "Database query error"
        });
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        let hashedPassword;
        const userPassword = await userModel.find({email: req.params.userEmail}).distinct('password').lean();
        if (req.body.password) {
            hashedPassword = await bcrypt.hash(req.body.password, 10);
        } else {
            hashedPassword = userPassword.toString();
        }
        const updatedUser = await userModel.updateOne({
            email: req.params.userEmail
        }, {
            $set: {
                name: req.body.name,
                password: hashedPassword,
                location: {
                    city: req.body.location.city,
                    district: req.body.location.district
                },
                role: req.body.role
            }
        });
        res.json({
            message: "Update user successful!"
        })
    } catch (err) {
        res.status(500).json({
            message: "Database query error"
        });
    }
};