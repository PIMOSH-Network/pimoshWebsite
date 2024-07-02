const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mainRouter = require('./routes/mainRoute');
const userRouter = require('./routes/userRoute');
const tutorRouter = require('./routes/tutorRoute'); // Ensure correct path
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const helmet = require('helmet');
const { ensureAuthenticated } = require('./middlewares/auth');
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use Helmet to secure Express headers
app.use(helmet());

// Body parser middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to database and server
const dbURI = 'mongodb+srv://pimoshpublishing:pimosh299!@cluster0.f8ctnu9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
    .then(() => {
        app.listen(PORT, () => {
            console.log('Server is running on port', PORT);
        });
    })
    .catch(err => console.error(err));

// Session middleware
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

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', mainRouter);
app.use('/users', userRouter);
app.use('/tutors', tutorRouter); // Add this line

module.exports = app;
