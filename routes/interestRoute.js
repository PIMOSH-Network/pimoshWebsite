const express = require('express');
const controller = require('../controllers/interestController');
const router = express.Router();


// Set up Interest Route 
router.get('/signup', controller.getInterest);


module.exports = router;