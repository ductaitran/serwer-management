const express = require("express");

const router = express.Router();

// Import controller
const userController = require('../controllers/users.controller');

// Import middleware
const passportMiddleware = require('../middlewares/passport.middleware');


// Get routes
router.get('/', userController.getAll);
router.get('/:userEmail', userController.getOne);


// Post routes
router.post('/', passportMiddleware.isEmailAvailable, userController.addUser);

// Delete routes
router.delete('/:userEmail', userController.deleteUser);

// Update routes (Put/Patch)
router.put('/:userEmail', userController.updateUser);

module.exports = router;