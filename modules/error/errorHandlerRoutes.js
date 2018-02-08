const express = require('express');
const engines = require('consolidate');
const assert = require('assert');

const app = module.exports = express();

// HTML conf
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname);

app.use(
    function errorHandler(err, req, res, next) {
        console.log("Error occured: " + err);
        res.status(400).render('error_template', { error: err });
    }
);