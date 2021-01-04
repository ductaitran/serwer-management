const express = require("express");
const router = express.Router();

// Import controller
const sewerController = require('../controllers/sewers.controller');

// Get routes
router.get('/', sewerController.getAll);
router.get('/:sewerId', sewerController.getOne);
router.get('/limit/:page/:limit', sewerController.getLimit);

// Post routes
router.post('/', sewerController.addSewer);

// Delete routes
router.delete('/:sewerId', sewerController.deleteSewer);

// Update routes (Put/Patch)
router.put('/:sewerId', sewerController.updateSewer);

module.exports = router;