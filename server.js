'use strict';
const express = require('express');

/**
 * Services
 */
const commandLineUtils = require('./utils/commandLineUtils.js');

/**
 * Routes
 */
const movieSearchRoute = require('./modules/movie');
const AlphaVantageRoute = require('./modules/alphaVantage');
const errorHandlerRoute = require('./modules/error');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(movieSearchRoute);
app.use(AlphaVantageRoute);
app.use(errorHandlerRoute);

/**
 * Lancement du serveur
 */
if(commandLineUtils.getCommandLineOptions().launchServer === 'Y') {
    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });
}

