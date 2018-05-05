'use strict';

const express = require('express');

var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');

/**
 * Services
 */
const commandLineUtils = require('./utils/commandLineUtils.js');

/**
 * Routes
 */
const logRoutes = require('./shared/log/log.routes')
const bookmarkSearchRoutes = require('./modules/bookmark');
const resourceSearchRoutes = require('./modules/resource');
const AlphaVantageRoutes = require('./modules/alphaVantage');
const errorHandlerRoutes = require('./modules/error');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logRoutes);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
    res.header("Content-Type", "text/json")
    next();
    // if('OPTIONS' == req.method) {
    //     res.sendStatus(200);
    // } else {
    //     next();
    // }
});

app.use(expressJwt({
    secret: 'SECRET',
    getToken: function (req) {
        
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/authenticate', '/users/register'] }));

app.use('/users', require('./modules/user/routes'));

app.use(resourceSearchRoutes);
app.use(bookmarkSearchRoutes);
app.use(AlphaVantageRoutes);
// app.use(errorHandlerRoute);

/**
 * Lancement du serveur
 */
if(commandLineUtils.getCommandLineOptions().launchServer === 'Y') {
    var server = app.listen(3000, function() {
        var port = server.address().port;
    });
}

