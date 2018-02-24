const express = require('express');
const engines = require('consolidate');
const bodyParser = require('body-parser');

const app = module.exports = express();

app.use(bodyParser.json({"strict": true}));
app.use(bodyParser.urlencoded({ extended: true }));

// HTML conf
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname);

app.use(
    function errorHandler(err, req, res, next) {
        console.error('error');
        res.status(500);
        res.send({ 'error': err });
    }
);