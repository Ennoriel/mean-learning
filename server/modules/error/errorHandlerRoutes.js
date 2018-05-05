const express = require('express');
const bodyParser = require('body-parser');

const app = module.exports = express();

app.use(bodyParser.json({"strict": true}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    function errorHandler(err, req, res, next) {
        console.error('error');
        res.status(500);
        res.send({ 'error': err });
    }
);