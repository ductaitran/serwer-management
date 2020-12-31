const express = require("express");
const router = express.Router();

// Import routes
const sewersRoute = require('./sewers.route');
const usersRoute = require('./users.route');
const schedulesRoute = require('./schedules.route');

// Import middlewares
const passportMiddleware = require('../middlewares/passport.middleware');

// Import controllers
const passportController = require('../controllers/passport.controller');
const userController = require('../controllers/users.controller');

router.post('/login', passportController.checkLogin);
router.post('/register', passportMiddleware.isEmailAvailable, userController.addUser);
router.use('/sewers', passportMiddleware.authenToken, sewersRoute);
router.use('/users', passportMiddleware.authenToken, usersRoute);
router.use('/schedules', passportMiddleware.authenToken, schedulesRoute);
router.use('/roles', passportMiddleware.authenToken, userController.getAllRole);


module.exports = router;