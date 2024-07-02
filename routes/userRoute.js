const express = require('express');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');
const { validateSignUp, validateLogIn, validateResult, validateRsvpStatus } = require('../middlewares/validator');
const router = express.Router();


// Set up Interest Route 
router.get('/signup', controller.getSignup);

//POST /users: create a new user account
router.post('/', controller.create);

//POST /users/login: GET user's login form
router.get('/login', controller.getLogin);


//POST /users/login: authenticate user's login
router.post('/login', controller.login);

module.exports = router;

