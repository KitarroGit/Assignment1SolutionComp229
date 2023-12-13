// Import necessary Node.js modules and Express middleware
var express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session');

var config = require('./env/development');

// Create Express app and export it
module.exports = function() {
    var app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    // Set the directory where views are present and view engine to EJS
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    // Configure route handlers
    require('../app/routes/homeRoutes.js')(app);
    require('../app/routes/aboutMeRoutes.js')(app);
    require('../app/routes/projectsRoutes.js')(app);
    require('../app/routes/servicesRoutes.js')(app);
    require('../app/routes/contactMeRoutes.js')(app);

    // Use static files with caching
    const oneDay = 24 * 60 * 60 * 1000; // Cache for 24 hours
    app.use(express.static('./public', {
        maxAge: oneDay
    }));

    return app;
};