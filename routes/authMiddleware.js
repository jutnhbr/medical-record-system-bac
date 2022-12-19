const connection = require('../config/database');
const Patient = connection.models.Patient;
var fs = require('fs');

module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({msg: 'You are not authorized to view this resource'});
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.type === "admin") {
        next();
    } else {
        res.status(401).json({msg: 'You are not authorized to view this resource because you are not an admin.'});
    }
}

module.exports.isDoctor = (req, res, next) => {
    if (req.isAuthenticated() && req.user.type === "doctor") {
        next();
    } else {
        res.status(401).json({msg: 'You are not authorized to view this resource because you are not a doctor.'});
    }
}

module.exports.isAuthorized = async (req, res, next) => {

    let user;
    let id = req.url.toString().replace("/patient/", "");
    let patient = await Patient.findOne({_id: id}, function (err, patient) {
        if (err) return (err);
        return (patient);
    });
    if (req.user) {
        let user = await req.user.toObject();

    }
    //TODO: Check if user is authorized to view this patient!!!!!!! (right user/ doctor)

    if (req.isAuthenticated() && user.patient) {
        next();
    }


    // if (req.isAuthenticated() && (user.doctor) && user.name === patient.doctor) {
    //
    //     next();
    // } else if (req.isAuthenticated() && (user.name === patient.name)) {
    //     next();
    // } else {
    //     res.status(401).json({msg: 'You are not authorized to view this resource.'});
    // }
}
module.exports.log = async (req, res, next) => {
    console.log(req)

    let date_ob = new Date();

// current date
// adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

// current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
    let year = date_ob.getFullYear();

// current hours
    let hours = date_ob.getHours();

// current minutes
    let minutes = date_ob.getMinutes();

// current seconds
    let seconds = date_ob.getSeconds();

    let user ="not logged in";
    if (req.user) {
        user = await req.user.toObject().username;

    }

    let log_data = {
        username: user,
        date: year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds,
        url: req.url,
        method: req.method

    }
    let logStream = fs.createWriteStream('data/logs/log.txt', {flags: 'a'});
    logStream.write("---------------------------------------------------------------\n");

    for (const [key, value] of Object.entries(log_data)) {

        logStream.write(key + ": " + value + "\n");

    }

    logStream.end();

    next();

}