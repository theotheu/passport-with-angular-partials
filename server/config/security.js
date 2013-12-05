/**
 * Created by theotheu on 05-12-13.
 */
module.exports = function (app) {
    var mongoose = require('mongoose')
        , passport = require('passport')
        , flash = require('connect-flash')
        , LocalStrategy = require('passport-local').Strategy;

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        var retObj = {
            isVerified: false,
            meta: {
                description: "You are not logged in.",
                function: "ensureAuthenticated (local)",
                timestamp: new Date(),
                filename: __filename
            }
        };
        return res.send(retObj);
    }

    passport.deserializeUser(function (id, done) {
        return done(null, {});
    });

    // Passport session setup.
    //   To support persistent login sessions, Passport needs to be able to
    //   serialize users into and deserialize users out of the session.  Typically,
    //   this will be as simple as storing the user ID when serializing, and finding
    //   the user by ID when deserializing.
    passport.serializeUser(function (user, done) {
        if (user && user.id) {
            done(null, user.id);
        } else {
            user = {};
            user.id = 0;

            done(null, user.id);
        }
    });


    // Use the LocalStrategy within Passport.
    //   Strategies in passport require a `verify` function, which accept
    //   credentials (in this case, a username and password), and invoke a callback
    //   with a user object.  In the real world, this would query a database;
    //   however, in this example we are using a baked-in set of users.
    // By default, LocalStrategy expects to find credentials in parameters named username and password.
    // If your site prefers to name these fields differently, options are available to change the defaults.
    // @see http://passportjs.org/guide/username-password/
    passport.use(new LocalStrategy(
        function (username, password, done) {

            if (username === "admin" && password === "admin") {
                var doc = {};
                return done(null, doc);
            } else {
                return done(err);
            }

        }
    ));

    // Routes
    app.get('/account', ensureAuthenticated, function (req, res) {
        var retObj = {
            isVerified: true,
            user: req.user,
            meta: {
                action: "account",
                timestamp: new Date(),
                filename: __filename,
                sessionID: req.sessionID
            }
        };
        return res.send(retObj);
    });

    app.get('/login', function (req, res) {
        var retObj = {
            isVerified: false,
            meta: {
                action: "login",
                description: "Access is not allowed. Please login",
                timestamp: new Date(),
                filename: __filename,
                sessionID: req.sessionID
            }
        };
        return res.send(retObj);

        //res.render('login', { user: req.user, message: req.flash('error') });
    });

    app.get("/myLogin", function (req, res) {
        var isVerified;
        isVerified = false;

        if (req.user && req.user !== null) {
            isVerified = true;
        }

        //
        var retObj = {
            meta: {action: "get myLogin",
                timestamp: new Date(),
                filename: __filename,
                sessionID: req.sessionID
            },
            isVerified: isVerified
        };
        return res.send(retObj);
    });

    app.post('/myLogin',
        passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}),
        function (req, res) {

            var retObj = {
                meta: {action: "post myLogin...",
                    timestamp: new Date(),
                    filename: __filename,
                    sessionID: req.sessionID
                },
                isVerified: true
            };
            return res.send(retObj);
        });

    app.get('/logout', function (req, res) {
        req.logout();
        var retObj = {
            isVerified: false,
            meta: {
                description: "You have successfully logged out.",
                timestamp: new Date()
            }
        };
        return res.send(retObj);

//        res.redirect('/');
    });

    // Simple route middleware to ensure user is authenticated.
    //   Use this route middleware on any resource that needs to be protected.  If
    //   the request is authenticated (typically via a persistent login session),
    //   the request will proceed.  Otherwise, the user will be redirected to the
    //   login page.
    // Attach the method to app, so that we have it available when we need it.
    app.ensureAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        var retObj = {
            isVerified: false,
            meta: {
                description: "You are not logged in.",
                function: "app.ensureAuthenticated",
                timestamp: new Date(),
                filename: __filename
            }
        };
        try {
            return res.send(retObj);
        } catch (err) {
            console.log(err);
        }

    }


}
