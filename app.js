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



// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to database
const dbURI = 'mongodb+srv://pimoshpublishing:pimosh299!@cluster0.f8ctnu9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT || 3001, () => {
            console.log('Server is running on port', process.env.PORT || 3001);
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

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



