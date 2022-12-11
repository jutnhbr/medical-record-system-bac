const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const connection = require('../config/database');
const User = connection.models.User;
const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;
const isAuthorized = require('./authMiddleware').isAuthorized;
const Patient = connection.models.Patient;
const Doctor = connection.models.Doctor;
const log = require('./authMiddleware').log;
/**
 * -------------- Helper Functions ----------------
 *
 */
let createAdmin = (req, res, next) => {
    User.countDocuments({username: req.body.uname}, function (err, count) {
        if (count > 0) {
            res.status(409).send('username taken');
            next("username taken");
        } else {
            const saltHash = genPassword(req.body.pw);

            const salt = saltHash.salt;
            const hash = saltHash.hash;

            const newAdmin = new User({
                username: req.body.uname,
                name: req.body.uname,
                hash: hash,
                salt: salt,
                admin: true
            });

            newAdmin.save()
            res.redirect('/login');
        }
    });
}
let createPatient = (req, res, next) => {
    User.countDocuments({username: req.body.uname}, function (err, count) {
        if (count > 0) {
            res.status(409).send('username taken');
            next("username taken");
        } else {
            const saltHash = genPassword(req.body.pw);

            const salt = saltHash.salt;
            const hash = saltHash.hash;

            const newUser = new Patient({
                username: req.body.username,
                name: req.body.firstname,
                hash: hash,
                salt: salt,
                patient: true,
                roomNR: 205,
                doctor: req.body.doctor
            });

            newUser.save()
                .then((user) => {
                    console.log(user);
                });

            res.redirect('/login');
        }
    })
};
let createDoctor = (req, res, next) => {
    User.countDocuments({username: req.body.uname}, function (err, count) {
        if (count > 0) {
            res.status(409).send('username taken');
            next("username taken");
        } else {
            const saltHash = genPassword(req.body.pw);

            const salt = saltHash.salt;
            const hash = saltHash.hash;

            const newUser = new Doctor({
                username: req.body.uname,
                name: "Johnny Sins",
                hash: hash,
                salt: salt,
                doctor: true,
                patients: []
            });

            newUser.save()
                .then((user) => {
                    console.log(user);
                });

            res.redirect('/login');
        }
    })
};


/*let createPatient = (req, res, next) => {
    const saltHash = genPassword(req.body.pw);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new Patient({
        username: req.body.uname,
        hash: hash,
        salt: salt,
        patient: true,
        roomNR:205,
    });

    newUser.save()
        .then((user) => {
            console.log(user);
        });

    res.redirect('/login');
};*/
/**
 * -------------- POST ROUTES ----------------
 */

router.post('/login', log,passport.authenticate('local', {
        failureRedirect: '/login-failure',
        successRedirect: 'login-success',
        passReqToCallback: true
    }
));

router.post('/register/*', log,isAdmin, async (req, res, next) => {
    let type = req.url.toString().replace("/register/", "")

    if (type === "admin") {
        createAdmin(req, res, next);
    } else if (type === "patient") {
        createPatient(req, res, next);
    } else if (type === "doctor") {
        createDoctor(req, res, next);
    } else {
        res.status(400).send('Bad Request');
    }

});


/**
 * -------------- GET ROUTES ----------------
 */

/**
 *
 * router.get("adminPanel", isAdmin, (req, res) => {
 *
 * }
 *
 */


router.get('/patient/*', log,isAuthorized, (req, res) => {
    let id = req.url.toString().replace("/patient/", "")
    Patient.findOne({_id: id}, function (err, patient) {
        if (err) return (err);
        res.send(patient);
    });

});
router.get("/users", log,isAdmin, async (req, res) => {
    console.log(req.user);
    let users = await Doctor.find({});
    users = users.map(user => {
        let edited_user = user.toObject();
        delete edited_user.hash;
        delete edited_user.salt;
        return edited_user;
    });
    res.send((users));


})

/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 *
 * Also, look up what behaviour express session has without a maxage set
 */

// Visiting this route logs the user out
router.get('/logout', log,(req, res) => {
    req.logout();
    res.redirect('/protected-route');
});

router.get('/login-success', log,(req, res) => {
    let key = '';

    if (req.user.type === 'admin') {
        key = 'admin'
    } else if (req.user.type === 'doctor') {
        key = 'doctor'
    } else if (req.user.type === 'patient') {
        key = 'patient'
    }
    console.log("> Key: " + key)
    console.log("> Login success");
    res.status(200).json(
        {
            authKey: req.isAuthenticated(),
            accessKey: key,
        });


});

router.get('/login-failure', log,(req, res) => {
    console.log("> Login failure");
    res.status(401).send("Invalid username and password combination.");
});

module.exports = router;