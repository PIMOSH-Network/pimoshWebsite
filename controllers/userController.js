const model = require('../models/user');
const tutor = require('../models/tutor');

const { hostname } = require('os');

exports.getSignup = (req, res, next) => {
    console.log('HELLO WORLD, getSignup')
    res.render('./user/signup');
};

exports.getLogin = (req, res, next) => {
    res.render('./user/login');
};


exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    model.findOne({ email: email })
        .then(user => {
            if (!user) {
                req.flash('error', 'Wrong email address');
                res.redirect('/users/login'); // Corrected path for user not found
            } else {
                user.comparePassword(password)
                    .then(result => {
                        if (result) {
                            req.session.user = user._id;
                            req.flash('success', 'You have successfully logged in');
                            res.redirect('/tutors/new'); // Corrected redirection path
                        } else {
                            req.flash('error', 'Wrong password');
                            res.redirect('/users/login'); // Corrected path for incorrect password
                        }
                    })
                    .catch(err => {
                        req.flash('error', 'An error occurred while comparing passwords');
                        res.redirect('/users/login');
                    });
            }
        })
        .catch(err => next(err));
};


exports.create = (req, res, next)=>{
    console.log('HELLO WORLD')
    let user = new model(req.body);
    user.save()
    .then(() => res.redirect('/users/login'))
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            return res.redirect('/users/signup');
        }

        if(err.code === 11000) {
            req.flash('error', 'Email has been used');  
            return res.redirect('/users/signup');
}
    next(err);
    });

};


exports.getProfile = (req, res, next) => {
    let id = req.session.user;

    // Use Promise.all to run multiple queries concurrently
    Promise.all([
        model.findById(id)
        // Event.find({ hostName: id }), // Events hosted by the user
        // rsvp.find({ user: id }).populate('event') // RSVPs for the user, with event data populated
    ])
    .then(results => {
        const user = results;
        console.log('user', req.session.user);

        // // Extract events from the populated RSVPs
        // const eventsFromRsvps = rsvps.map(rsvp => rsvp.event);

        res.render('./user/profile', { user });
    })
    .catch(err => next(err));
};
