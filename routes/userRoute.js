const express = require('express');
const controller = require('../controllers/userController');
const router = express.Router();


// Set up Interest Route 
router.get('/signup', controller.getSignup);

// Set up Interest Route 
router.get('/login', controller.getLogin);

module.exports = router;