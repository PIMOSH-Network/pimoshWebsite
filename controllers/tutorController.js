// controllers/tutorController.js

const { validationResult } = require('express-validator'); // Import validationResult
const Tutor = require('../models/tutor');
const User = require('../models/user'); // Ensure this path is correct

// Get all tutor applications for the logged-in user
exports.getTutors = (req, res, next) => {
    const userId = req.session.user;
    User.findById(userId)
        .then(user => {
            if (user) {
                Tutor.find({ user: userId })
                    .then(tutors => {
                        res.render('tutors', { tutors, user });
                    })
                    .catch(err => {
                        req.flash('error', 'Failed to fetch tutor applications');
                        return next(err);
                    });
            } else {
                req.flash('error', 'User not found');
                res.redirect('/login');
            }
        })
        .catch(err => {
            req.flash('error', 'Failed to fetch user details');
            return next(err);
        });
};

exports.new = (req, res, next) => {
    const userId = req.session.user;
    if (!userId) {
        req.flash('error', 'No user ID found in session');
        return res.redirect('/login');
    }

    User.findById(userId)
        .then(user => {
            if (user) {
                const errors = req.flash('error');
                console.log('Rendering new tutor form'); // Add log
                res.render('./tutor/new', { errors, user });
            } else {
                req.flash('error', 'User not found');
                res.redirect('/login');
            }
        })
        .catch(err => {
            console.error('Failed to fetch user details:', err); // Add log
            req.flash('error', 'Failed to fetch user details');
            return next(err);
        });
};

// Create a new tutor application
exports.create = (req, res, next) => {
    const userId = req.session.user;
    if (!userId) {
        req.flash('error', 'No user ID found in session');
        return res.redirect('/login');
    }

    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error', errors.array().map(err => err.msg));
        return res.redirect('/tutors/new');
    }

    // Log the received form data for debugging
    console.log('Received form data:', req.body);
    console.log('Received files:', req.files);

    const { email, name, phone, position, employer1, employer2, reference, source } = req.body;
    const coverLetter = req.files.coverLetter ? req.files.coverLetter[0].path : '';
    const selfie = req.files.selfie ? req.files.selfie[0].path : '';
    const resume = req.files.resume ? req.files.resume[0].path : '';

    const newTutor = new Tutor({
        email, 
        name, 
        phone, 
        position, 
        employer1, 
        employer2, 
        coverLetter, 
        selfie, 
        resume, 
        reference, 
        source,
        user: userId
    });

    console.log('New Tutor Object:', newTutor);

    newTutor.save()
        .then(() => {
            console.log('Tutor application saved successfully');
            req.flash('success', 'Application submitted successfully');
            res.redirect('/tutors/new');
        })
        .catch(err => {
            console.error('Error saving new tutor:', err);
            req.flash('error', 'Failed to submit application');
            return next(err);
        });
};


// Render form to edit an existing tutor application
exports.editTutor = (req, res, next) => {
    const userId = req.session.user;
    User.findById(userId)
        .then(user => {
            if (user) {
                Tutor.findOne({ _id: req.params.id, user: userId })
                    .then(tutor => {
                        if (tutor) {
                            const errors = req.flash('error');
                            res.render('edit', { tutor, errors, user });
                        } else {
                            req.flash('error', 'Tutor application not found');
                            res.redirect('/tutors');
                        }
                    })
                    .catch(err => {
                        req.flash('error', 'Failed to fetch tutor application');
                        return next(err);
                    });
            } else {
                req.flash('error', 'User not found');
                res.redirect('/login');
            }
        })
        .catch(err => {
            req.flash('error', 'Failed to fetch user details');
            return next(err);
        });
};

// Update an existing tutor application
exports.updateTutor = (req, res, next) => {
    const userId = req.session.user;
    User.findById(userId)
        .then(user => {
            if (user) {
                Tutor.findOneAndUpdate(
                    { _id: req.params.id, user: userId },
                    req.body,
                    { new: true, runValidators: true }
                )
                    .then(updatedTutor => {
                        if (updatedTutor) {
                            req.flash('success', 'Tutor application updated successfully');
                            res.redirect('/tutors');
                        } else {
                            req.flash('error', 'Tutor application not found');
                            res.redirect('/tutors');
                        }
                    })
                    .catch(err => {
                        req.flash('error', 'Failed to update tutor application');
                        return next(err);
                    });
            } else {
                req.flash('error', 'User not found');
                res.redirect('/login');
            }
        })
        .catch(err => {
            req.flash('error', 'Failed to fetch user details');
            return next(err);
        });
};

// Delete a tutor application
exports.deleteTutor = (req, res, next) => {
    const userId = req.session.user;
    User.findById(userId)
        .then(user => {
            if (user) {
                Tutor.findOneAndDelete({ _id: req.params.id, user: userId })
                    .then(deletedTutor => {
                        if (deletedTutor) {
                            req.flash('success', 'Tutor application deleted successfully');
                            res.redirect('/tutors');
                        } else {
                            req.flash('error', 'Tutor application not found');
                            res.redirect('/tutors');
                        }
                    })
                    .catch(err => {
                        req.flash('error', 'Failed to delete tutor application');
                        return next(err);
                    });
            } else {
                req.flash('error', 'User not found');
                res.redirect('/login');
            }
        })
        .catch(err => {
            req.flash('error', 'Failed to fetch user details');
            return next(err);
        });
};
