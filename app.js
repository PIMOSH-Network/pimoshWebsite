const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mainRouter = require('./routes/mainRoute');
const userRouter = require('./routes/userRoute');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const { error } = require('console');
const PORT = process.env.PORT || 3000;


// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to database and server
const dbURI = 'mongodb+srv://pimoshpublishing:pimosh299!@cluster0.f8ctnu9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log('Server is running on port', process.env.PORT || 3000);
        });
    })
    .catch(err => console.error(err));


// session middleware

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "ajfeirf90aeu9eroejfoefj",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: dbURI }),
    cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});



// Routes
app.use('/', mainRouter);
app.use('/users', userRouter);

// Error handling
app.use((req, res, next) => {
    const err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    res.status(errorStatus);
    res.render('error', { err: { status: errorStatus, message: err.message } });
});
