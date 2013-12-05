/**
 * Created by theotheu on 05-12-13.
 */
/**
 * Module dependencies.
 */
var express = require('express')
    , fs = require('fs')
    , http = require('http')
    , path = require('path')
    , passport = require('passport')
    , flash = require('connect-flash');
;

// Load configuration
var env = process.env.NODE_ENV || 'development'
    , config = require('./config/config.js')[env];

// Bootstrap db connection
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
mongoose.connect(config.db);

// Bootstrap models
/**
 * We need the model if we want to validate username & password against the database
 */
var models_path = __dirname + '/app/models'
    , model_files = fs.readdirSync(models_path);
model_files.forEach(function (file) {
    require(models_path + '/' + file);
})

var app = express();
app.configure(function () {
    app.set('port', process.env.PORT || config.port);   // Set port for process.
    app.use(express.favicon());
    app.use(express.logger('dev'));                     // logs events from now on.
    app.use(express.json());                            // Send a JSON response. This method is identical to res.send() when an object or array is passed, however it may be used for explicit JSON conversion of non-objects (null, undefined, etc), though these are technically not valid JSON.
    app.use(express.urlencoded());                      // Request body parsing middleware supporting JSON, urlencoded, and multipart requests. This middleware is simply a wrapper the json(), urlencoded(), and multipart() middleware.
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here')); // Parses the Cookie header field and populates req.cookies with an object keyed by the cookie names. Optionally you may enabled signed cookie support by passing a secret string.
    app.use(express.session());
    // Passport middleware -- begin
    // Initialize Passport!  Also use passport.session() middleware, to support
    // persistent login sessions (recommended).
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    //  Passport middleware -- end
    app.use(app.router);
    app.use(express.static(path.join(__dirname, '../client')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

// Bootstrap passport
require('./config/security.js')(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

// Bootstrap routes
/* We don't need routes in this example */

// Last line to serve static page
console.log('Last resort');
app.use(express.static(__dirname + '../client/'));
