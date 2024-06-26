// const model = require('../models/interest');

// const { hostname } = require('os');

exports.getInterest = (req, res, next) => {
    res.render('./interestUser/signup');
};

// exports.getLogin = (req, res, next) => {
//     res.render('interestUser/login');
// };

// exports.new = (req, res)=>{
//     return res.render('interestUser/signup');
//    };

// exports.create = (req, res, next)=>{
//         let user = new model(req.body);
//         user.save()
//         .then(() => res.redirect('/interestUser/login'))
//         .catch(err=>{
//             if(err.name === 'ValidationError' ) {
//                 req.flash('error', err.message);  
//                 return res.redirect('/interestUser/signup');
//             }
    
//             if(err.code === 11000) {
//                 req.flash('error', 'Email has been used');  
//                 return res.redirect('/interestUser/signup');
//     }
//         next(err);
//         });

// };