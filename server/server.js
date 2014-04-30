/**
 * Created by theotheu on 27-10-13.
 */

/**
 * Module dependencies.
 */
var express = require('express')
    , fs = require('fs')
    , http = require('http')
    , path = require('path')
    , passport = require('passport')
    , morgan = require('morgan')
    , methodOverride = require('method-override')
    , cookieParser = require('cookie-parser')
    , session = require('express-session')
    , flash = require('connect-flash')
    , favicon = require('static-favicon')
    , bodyParser = require('body-parser')
    , errorHandler = require('express-error-handler')
    ;

// Load configuration
var env = process.env.NODE_ENV || 'development'
    , config = require('./config/config.js')[env];

// Bootstrap db connection
/* No database required */

// Bootstrap models
/* No models required */


var app = express();

app.listen(process.env.PORT || config.port);    // listen on the configured port number
app.use(favicon(__dirname + '/public/favicon.ico'));
if (env === 'development') {
    app.use(morgan('dev')); 					// log every request to the console
}
//app.use(json);
app.use(methodOverride()); 					    // simulate DELETE and PUT
app.use(cookieParser());                        // required before session.
app.use(session({ secret: 'keyboard cat', key: 'sid'}));    // https://github.com/expressjs/session/blob/master/README.md
app.use(bodyParser());                          // instruct the app to use the `bodyParser()` middleware for all routes
// FIXME: check if this is still valid: http://andrewkelley.me/post/do-not-use-bodyparser-with-express-js.html
app.use(flash());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, '../client')));
app.use(errorHandler());

// Bootstrap passport
require('./config/security.js')(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + config.port);
});

// Bootstrap routes
/* No routes required */

// Last line to serve static page
app.use(express.static(__dirname + '../client/'));
