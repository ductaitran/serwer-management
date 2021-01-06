const express = require("express");

const router = express.Router();

// Import controller
const locationController = require('../controllers/locations.controller');

// Import middlewares
const { isLocationNameAvailable, isDistrictNameAvailable } = require('../middlewares/general.middleware');

// Get routes
router.get('/', locationController.getAll);
router.get('/:city', locationController.getOne);


// Post routes
router.post('/', isLocationNameAvailable, locationController.addLocation);
router.post('/district', isDistrictNameAvailable, locationController.addDistrict);

// Delete routes
router.delete('/:name', locationController.deleteLocation);

module.exports = router;