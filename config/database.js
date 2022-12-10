const mongoose = require('mongoose');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */ 

const conn = process.env.DB_STRING;

const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const AdminSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    type: String
},{ versionKey: false });

const PatientSchema = new mongoose.Schema({
    username: String,
    versicherungsnummer: String,
    firstname: String,
    lastname: String,
    fullname: String,
    hash: String,
    salt: String,
    roomNR: Number,
    doctor: String,
    type: String
},{ versionKey: false });

const DoctorSchema = new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    fullname: String,
    hash: String,
    salt: String,
    patients: [String],
    type: String

},{ versionKey: false });

/*
var users = mongoose.model('User', loginUserSchema, 'users');
var registerUser = mongoose.model('Registered', registerUserSchema, 'users');
*/

const User = connection.model('User', AdminSchema,"users");
const Patient = connection.model('Patient', PatientSchema,"users");
const Doctor = connection.model('Doctor', DoctorSchema,"users");
// Expose the connection
module.exports = connection;
