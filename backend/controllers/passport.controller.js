const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Import models
const userModel = require('../models/user.model');

module.exports.checkLogin = async (req, res) => {
    try {
        const userFound = await userModel.findOne({
            email: req.body.email
        });
        if (!userFound) return res.status(401).send({message: "User not found!"});

        const isPasswordMatched = await bcrypt.compare(req.body.password, userFound.password);
        if (!isPasswordMatched) return res.status(401).send({message: "Incorrect password!"});

        const accessToken = jwt.sign(userFound.toObject(), process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
        });
        res.json({
            name: userFound.name,
            email: userFound.email,
            role: userFound.role,
            created_date: userFound.created_date,
            location: {
                city: userFound.location.city,
                district: userFound.location.district
            },
            accessToken: accessToken
        });
    } catch (err) {
        res.json({
            message: err
        });
    }
};

module.exports.isAdmin = (role) => {
    return role === "Admin" ? true : false;
}