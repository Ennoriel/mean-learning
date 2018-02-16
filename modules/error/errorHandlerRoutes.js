const express = require('express');
const engines = require('consolidate');

const app = module.exports = express();

// HTML conf
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname);

app.use(
    function errorHandler(err, req, res, next) {
        console.log("Error occured: " + err);
        res.status(400).send({ error: err });
    }
);