const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const connection = require('../config/database');
const Admin= connection.models.Admin;
const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;

let createAdmin = (req, res, next) =>{
    Admin.countDocuments({username: req.body.uname}, function (err, count) {
        if (count > 0) {
            res.status(409).send('username taken');
            next("username taken");
        }
        else{
            const saltHash = genPassword(req.body.pw);

            const salt = saltHash.salt;
            const hash = saltHash.hash;

            const newAdmin = new Admin({
                username: req.body.uname,
                hash: hash,
                salt: salt,
                admin: true
            });

            newAdmin.save()
                .then((user) => {
                    //console.log(user);
                });
            res.redirect('/login');
        }
    });
}
/**
 * -------------- POST ROUTES ----------------
 */

 router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: 'login-success' }));

 router.post('/register/*', isAdmin, async (req, res, next) => {
     let type = await req.url.toString().replace("/register/", "")

     if (type === "admin") {
         createAdmin(req, res, next);
     } else {
         res.status(400).send('Bad Request');
     }

 });


 /**
 * -------------- GET ROUTES ----------------
 */

router.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get('/login', (req, res, next) => {
   
    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="uname">\
    <br>Enter Password:<br><input type="password" name="pw">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

// When you visit http://localhost:3000/register, you will see "Register Page"
router.get('/register/*',isAdmin, async (req, res, next) => {
    let type = req.url.toString().replace("/register/", "")
    const form =
        '<h1>Register Page ' + type.toString() + '</h1>' + '<form method="post" action="/register/'+type.toString()+'"'+'>\
                    Enter Username:<br><input type="text" name="uname">\
                    <br>Enter Password:<br><input type="password" name="pw">\
                    <br><br><input type="submit" value="Submit"></form>';
    console.log(form);
    res.send(form);

});

/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 *
 * Also, look up what behaviour express session has without a maxage set
 */
router.get('/protected-route', isAuth, (req, res, next) => {
    res.send('You made it to the route.');
});

router.get('/admin-route', isAdmin, (req, res, next) => {
    res.send('You made it to the admin route.');
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/protected-route');
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

module.exports = router;