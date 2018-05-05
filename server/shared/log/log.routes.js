
var express = require('express');
 
const app = module.exports = express();

app.use(function(req, res, next) {
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("* * * * * * * * * * * * * * * * * * * *");
    console.log("* * * * * * * * * * * * * * * * * * * *");
    console.log("* * * * * * NEW TRANSACTION * * * * * *");
    console.log("* * * * * * * * * * * * * * * * * * * *");
    console.log("* * * * * * * * * * * * * * * * * * * *");
    console.log(req.method + ' http://' + req.headers.host + req.url);
    console.log("HEADER:")
    console.log(req.headers);
    console.log("BODY:")
    console.log(req.body);
    console.log("QUERY:")
    console.log(req.query);

    next();
});