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

//POST /users/login: authenticate user's login
router.post('/login', controller.login);

//GET /users/profile: send user's profile page
router.get('/profile', controller.getProfile);

module.exports = router;

// router.post('/', isGuest, validateSignUp, validateResult, controller.create);
// validateResult is the issue present
// validateSignUp allows passwords less than 8 characters
// flash messages aren't appearing
