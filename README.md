Description
===========
This demo shows how to use passport.js with angular partials.

Everything that is not needed, is left out. You cannot just copy 'n paste this into your project.




Setup
=====
Installation for development
----------------------------
Change directory to the workspaces directory, eg ```/home/webdev/workspaces``` where webdev is your username.

Clone the repository with
```
git clone https://github.com/theotheu/passport-with-angular-partials.git ~/workspaces/passportDemo
```

Go to the working directory
```
cd ~/workspaces/passportDemo
```

Configuration
----------
Copy ```config.js.default``` to ```config.js```.
```sh
cp ~/workspaces/passportDemo/server/config/config.js.default ~/workspaces/passportDemo/server/config/config.js
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
cd ~/workspaces/passportDemo/server
npm install
```

Import users
------------
Go to directory ~/workspaces/passportDemo/data

```sh
mongoimport -db p3000 --collection users --file users.js
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