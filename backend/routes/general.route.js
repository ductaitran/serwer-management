const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

// Import routes
const sewersRoute = require('./sewers.route');
const usersRoute = require('./users.route');

// Import middlewares
const authenUser = require('../middlewares/authenUser.middleware');
const userModel = require("../models/user.model");

router.post('/login', async (req, res) => {
    try {
        const userFound = await userModel.findOne(
            {
                email: `${req.body.email}`,
                password: `${req.body.password}`
            });
        if (!userFound) return res.sendStatus(401);
        const accessToken = jwt.sign(userFound.toObject(), process.env.ACCESS_TOKEN_SECRET);
        res.json({accessToken: accessToken});
        }
    catch (err) {
        res.json({message: err});
    }
});
router.use('/sewers', authenUser.authenToken, sewersRoute);
router.use('/users', authenUser.authenToken, usersRoute);


module.exports = router;