Description
===========
This demo shows how to use passport.js with angular partials.

Everything that is not needed, is left out. You cannot just copy 'n paste this into your project.


Setup
=====
Installation for development
----------------------------

Clone the repository with
```
git clone https://github.com/theotheu/passport-with-angular-partials.git ~/workspaces/passport-with-partialsDemo
```

Go to the working directory
```
cd ~/workspaces/passport-with-partialsDemo
```

Import seed
```
mongorestore --collection users --db p123456 ~/workspaces/passport-with-partialsDemo/data/p123456/users.bson
mongorestore --collection users --db p123456 ~/workspaces/passport-with-partialsDemo/data/p123456/users.metadata.json
```

Configuration
----------
Copy ```config.js.default``` to ```config.js```.
```sh
cp ~/workspaces/passport-with-partialsDemo/server/config/config.js.default ~/workspaces/passport-with-partialsDemo/server/config/config.js
```

Change the database, port and emailaddress.

Example
```javascript
module.exports = {
    development: {
        db: 'mongodb://localhost/p123456',
        port: 3000,
        mailTo: "you@example.com",
        AccessControlAllowMethods: "GET,PUT,POST,DELETE",
        allowedDomains: "*"
    }
    , test: {
    }
    , production: {
    }
}
```

Install node modules
----------
The archive is without the node modules.

Install with
```sh
cd ~/workspaces/passport-with-partialsDemo/server
npm install
```

supervisor
----------
Make sure you have supervisor installed - with the global option

```sh
npm install -g supervisor
```

Use it with
```sh
supervisor --no-restart-on error server.js
```

Instructions to prepare a deployment
===================================

* Verify that you have a explanatory README.md
* Make an export of your data with mongodump ```mongodump --collection users --db p123456 --out ~/workspaces/passport-with-partialsDemo/data``` (see http://docs.mongodb.org/v2.2/reference/mongodump/)
* Create in your repository a directory ```data``` where you put your export, with import instructions.
* Push the repository
*
