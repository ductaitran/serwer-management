const express = require("express");
const router = express.Router();

// Import controller
const scheduleController = require('../controllers/schedules.controller');

// Get routes
router.get('/', scheduleController.getAll);
router.get('/:sewerId', scheduleController.getOneBySewer);

// Post routes
router.post('/', scheduleController.addSchedule);

// Delete routes
router.delete('/:scheduleId', scheduleController.deleteSchedule);

// Update routes (Put/Patch)
// router.patch('/sewerId', sewerController.updateSewer);

module.exports = router;