const jwt = require('jsonwebtoken');

// Import models
const userModel = require('../models/user.model');

module.exports.authenToken = (req, res, next) => {
    const authenHeader = req.headers['authorization'];
    const token = authenHeader && authenHeader.split(' ')[1]
    if (token == undefined) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {maxAge: '1h'}, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
};

module.exports.isEmailAvailable = async (req, res, next) => {
    try {
        const userFound = await userModel.findOne({
            email: req.body.email
        });
        if (userFound) return res.status(404).json("User is not available");
        next();
    } catch (err) {
        res.json({
            message: err
        });
    }
};