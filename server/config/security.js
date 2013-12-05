/**
 * Created by theotheu on 27-10-13.
 */
module.exports = function (app) {
    var mongoose = require('mongoose')
        , passport = require('passport')
        , flash = require('connect-flash')
        , LocalStrategy = require('passport-local').Strategy
        , passwordHash = require('password-hash')
        , User = mongoose.model('User');

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
        User.findOne({ _id: id }, function (err, doc) {
            if (err) {
                return done(err);
            }
            if (!doc) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            // Create user object
            var user = {};
            user.username = doc.name;
            user.email = doc.email;

            return done(err, user);
        });

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

            // matches uppercase / lowercase
            var usernameRegex = new RegExp(username, 'i');
            User.findOne({ email: usernameRegex }, function (err, doc) {

                var hashedPassword = "";
                if (doc && doc.password) {
                    hashedPassword = doc.password;
                }
                console.log('================================ LOGIN');
                console.log('= filename      : ', __filename);
                console.log("= username      : ", username);
                console.log("= verify        : ", passwordHash.verify(password, hashedPassword));

                // Verify given password (or empty string) with stored password
                // @see https://github.com/davidwood/node-password-hash/blob/master/README.md
                if (password === "" || !passwordHash.verify(password, hashedPassword)) {
                    console.log("= result        :  Invalid password");
                    console.log("= password      :  " + password + " (try the default password)");
                    console.log('================================ <<<<<');
                    doc = {};
                    return done(err);
                }

                if (err) {
                    console.log("= result        :  Error (see below)");
                    console.log('= err ', err);
                    console.log('================================ <<<<<');
                    return done(err);
                }
                if (!doc) {
                    console.log("= result        :  Invalid username");
                    console.log('================================ <<<<<');
                    return done(null, false, { message: 'Invalid username.' });
                }

                console.log("= result        :  Success!");
                console.log('================================ <<<<<');
                return done(null, doc);
            });
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
