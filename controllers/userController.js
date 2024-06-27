const model = require('../models/user');
const { hostname } = require('os');

exports.getSignup = (req, res, next) => {
    console.log('getSignup is running')
    res.render('./user/signup');
};

exports.getLogin = (req, res, next) => {
    res.render('./user/login');
};


exports.create = (req, res, next)=>{
    console.log('exports.create is running')
    let user = new model(req.body);
    user.save()
    .then(() => res.redirect('/users/login'))
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            return res.redirect('/users/signup');
        }

        if(err.code === 11000) {
            console.log('EMAIL HAS BEEN USED')
            req.flash('error', 'Email has been used');  
            return res.redirect('/users/signup');
}
    next(err);
    });

};

exports.login = (req, res, next) => {
    console.log('getProfile is running')
    res.redirect('/users/profile')
};

exports.getProfile = (req,res,next) => {
    res.render('./user/profile')
}