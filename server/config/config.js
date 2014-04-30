/**
 * Created by theotheu on 27-10-13.
 */
module.exports = {
    development: {
        db: 'mongodb://localhost/theotheu',      // change p123456 with your database
        port: 3000,                             // change 3000 with your port number
        mailTo: "theo.theunissen@gmail.com",    // use your email address
        AccessControlAllowMethods: "GET,PUT,POST,DELETE",
        allowedDomains: "*"
    }, test: {
        db: 'mongodb://localhost/theotheu',      // change p123456 with your database
        port: 1300,                             // change 3000 with your port number
        mailTo: "theo.theunissen@gmail.com",    // use your email address
        AccessControlAllowMethods: "GET,PUT,POST,DELETE",
        allowedDomains: "*"
    }, production: {

    }
};
