const express = require("express");
const router = express.Router();

// Import routes
const sewersRoute = require('./sewers.route');
const usersRoute = require('./users.route');

// Import middlewares
const authenUser = require('../middlewares/jsonWebToken.middleware');

// Import controllers
const passport = require('../controllers/passport.controller');
const userController = require('../controllers/users.controller');

router.post('/login', passport.checkLogin);
router.post('/register', passport.isEmailAvailable, userController.addUser);
router.use('/sewers', authenUser.authenToken, sewersRoute);
router.use('/users', authenUser.authenToken, usersRoute);


module.exports = router;