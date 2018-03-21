const express = require('express');
const nconf = require('nconf');

const app = module.exports = express();

nconf.argv().env().file('keys.json');

app.get('/apiVantageApiKey', function(req, res, next) {
    res.status(200).send({"apiKey": nconf.get("alphaVantageApiKey")});
});