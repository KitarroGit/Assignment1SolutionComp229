// Import necessary Node.js modules and Express middleware
const express = require('express'),
      morgan = require('morgan'),
      compress = require('compression'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      session = require('express-session');

const config = require('./env/development');

// Create Express app and export it
module.exports = function() {
    const app = express();

    if (process.env.NODE_ENV === 'development') {
        // In development, use morgan for logging and disable static file caching
        app.use(morgan('dev'));
        app.use(express.static('./public', { maxAge: 0 }));
    } else if (process.env.NODE_ENV === 'production') {
        // In production, use compression and enable static file caching
        app.use(compress());
        const oneDay = 24 * 60 * 60 * 1000; // Cache for 24 hours
        app.use(express.static('./public', { maxAge: oneDay }));
    }

    app.use(bodyParser.urlencoded({ extended: true }));
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

    return app;
};
