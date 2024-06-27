const model = require('../models/user');

const { hostname } = require('os');

exports.getSignup = (req, res, next) => {
    console.log('HELLO WORLD, getSignup')
    res.render('./user/signup');
};

exports.getLogin = (req, res, next) => {
    res.render('./user/login');
};


// const userModel = require('./models/user')

// const newUser = new userModel({
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'john.doe@example.com',
//     password: 'hashedPassword'
//   });
  
//   newUser.save()
//     .then(savedUser => {
//       console.log('User saved to database:', savedUser);
//       // You can also redirect, send a response, or perform further actions here
//     })
//     .catch(err => {
//       console.error('Error saving user to database:', err);
//       // Handle error appropriately (e.g., show error messages, redirect, etc.)
//     });

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
