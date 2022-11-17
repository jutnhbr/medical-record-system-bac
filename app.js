const express = require('express');
const session = require('express-session');
let passport = require('passport');
let routes = require('./routes');
const connection = require('./config/database');
const cors = require('cors');

// Package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require('connect-mongo')(session);

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


/**
 * -------------- SESSION SETUP ----------------
 */

const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions' });

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

/*app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});*/

/**
 * -------------- ROUTES ----------------
 */

// Imports all the routes from ./routes/index.js
app.use(routes);


/**
 * -------------- SERVER ----------------
 */

app.use(cors({
    origin: "http://localhost:3001",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}));


// Server listens on http://localhost:3000
app.listen(3000);