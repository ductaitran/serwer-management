const express = require("express");

const router = express.Router();

// Import model
const userModel = require('../models/user.model');


router.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch(err) {
        res.json({message: err});
    }
});

router.post('/', async (req, res) => {
    try {
        const user = new userModel( {
            name: req.body.name,
            description: req.body.description
        });

        const savedUser = await user.save();
        res.json(savedUser);
    } catch(err) {
        res.json({message: err});
    }
})

module.exports = router;