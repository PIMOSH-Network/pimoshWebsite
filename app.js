const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mainRouter = require('./routes/mainRoute');

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', mainRouter);


// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
