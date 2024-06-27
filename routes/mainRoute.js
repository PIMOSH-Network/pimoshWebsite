const express = require('express');
const controller = require('../controllers/mainController');
const router = express.Router();

// Set up Home Route 
router.get('/', controller.getHome);

// Set up Tutoring Route 
router.get('/tutor', controller.getTutoring);

// Set up About Us Route 
router.get('/about_us', controller.getAbout);

// Set up Testimonials Route 
router.get('/testimonials', controller.getTestimonials);

// Set up Blog Route 
router.get('/blog', controller.getBlog);  

// Set up Events Route 
router.get('/events', controller.getEvents);

// Set up FAQ Route 
router.get('/faq', controller.getFaq);

// Set up Contact Route 
router.get('/contact', controller.getContact);

// Set Up Tech Titans Route

module.exports = router;
