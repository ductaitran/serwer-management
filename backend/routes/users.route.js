const express = require("express");

const router = express.Router();

// Import controller
const userController = require('../controllers/users.controller');

// Get routes
router.get('/', userController.getAll);

// Post routes
router.post('/:sewerId', userController.addUser);

// Delete routes
router.delete('/sewerId', userController.deleteUser);

module.exports = router;