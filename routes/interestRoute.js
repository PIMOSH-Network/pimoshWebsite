const express = require('express');
const controller = require('../controllers/interestController');
const router = express.Router();


// Set up Interest Route 
router.get('/signup', controller.getInterest);

// Set up Interest Route 
router.get('/login', controller.getLogin);

module.exports = router;