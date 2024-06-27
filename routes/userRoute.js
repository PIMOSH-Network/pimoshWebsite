const express = require('express');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');
const { validateSignUp, validateLogIn, validateResult, validateRsvpStatus } = require('../middlewares/validator');
const router = express.Router();


// Set up Interest Route 
router.get('/signup', controller.getSignup);

// Set up Interest Route 
router.get('/login', controller.getLogin);

//POST /users: create a new user account
router.post('/', isGuest, validateSignUp, controller.create);

module.exports = router;

// router.post('/', isGuest, validateSignUp, validateResult, controller.create);
// validateResult is the issue present
