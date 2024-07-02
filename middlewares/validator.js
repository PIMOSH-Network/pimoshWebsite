
const moment = require('moment'); 
const { body, validationResult, check } = require('express-validator');
const { DateTime } = require('luxon');
const validator = require('validator');

// validate story id
exports.validateId = (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        const err = new Error('No ID provided');
        err.status = 400;
        next(err);
    } else if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        const err = new Error('Invalid Event ID format');
        err.status = 400;
        next(err); 
    } 
      return next(); 
    }

exports.validateSignUp = [body('firstName','First name is required ').notEmpty().trim().escape(),
    body('lastName','Last Name is required').notEmpty().trim().escape(),
    body('email','Email is not valid').isEmail().trim().escape().normalizeEmail(), 
    body('password', 'Password must be at 8 characters and atmost 64 characters').isLength({min: 8, max: 64})];

exports.validateLogIn = [body('email','Email must be a valid email address').isEmail().trim().escape().normalizeEmail(), 
    body('password', 'Password must be at 8 characters and atmost 64 characters').isLength({min: 8, max: 64})];

// Validate Start and End Date
exports.validateStartEndDate = (req, res, next) => {
    const { startDate, endDate } = req.body;

    // Use moment to handle dates and times
    const now = moment(); // Current time
    const start = moment(startDate); // Assumes startDate includes both date and time
    const end = moment(endDate); // Assumes endDate includes both date and time

    // Check if the start date and time is after the current moment
    if (!start.isAfter(now)) {
        req.flash('error', 'start must be after today.');
        return res.redirect('back');  
    } 

    // Check if the end date and time is after the start date and time
    if (!end.isAfter(start)) {
        req.flash('error', 'End must be after Start.');
        return res.redirect('back');  
    }

    next(); 
};


// Validation and sanitization middleware for tutor form
exports.validateTutor = [
    body('email', 'Please enter a valid email address').isEmail().trim().escape().normalizeEmail(),
    body('name', 'Name is required').notEmpty().trim().escape(),
    body('phone', 'Phone number must be 10 digits').isLength({ min: 10, max: 10 }).trim().escape().isNumeric(),
    body('position', 'Position is required').notEmpty().trim().escape(),
    body('employer1', 'Most recent employer is required').notEmpty().trim().escape(),
    body('employer2', 'Employer number two is required').notEmpty().trim().escape(),
    body('reference', 'Reference is required').notEmpty().trim().escape(),
    body('source', 'Source is required').notEmpty().trim().escape()
];

// Middleware to check validation results
exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    }
    next();
};

// Middleware to check file uploads
exports.validateFiles = (req, res, next) => {
    if (!req.files.coverLetter) {
        req.flash('error', 'Cover letter is required');
        return res.redirect('back');
    }
    if (!req.files.selfie) {
        req.flash('error', 'Selfie is required');
        return res.redirect('back');
    }
    if (!req.files.resume) {
        req.flash('error', 'Resume is required');
        return res.redirect('back');
    }
    next();
};