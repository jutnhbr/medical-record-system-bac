const connection = require('../config/database');
const Patient = connection.models.Patient;

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