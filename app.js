const express = require('express');
const session = require('express-session');
// Package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require('connect-mongo')(session);

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


/**
 * -------------- SESSION SETUP ----------------
 */



/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */



/**
 * -------------- ROUTES ----------------
 */



/**
 * -------------- SERVER ----------------
 */

