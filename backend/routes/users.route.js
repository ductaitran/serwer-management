const express = require("express");

const router = express.Router();

// Import controller
const userController = require('../controllers/users.controller');
const passport = require('../controllers/passport.controller');


// Get routes
router.get('/', userController.getAll);
router.get('/:userEmail', userController.getOne);


// Post routes
router.post('/', passport.isEmailAvailable, userController.addUser);

// Delete routes
router.delete('/:userEmail', userController.deleteUser);

module.exports = router;