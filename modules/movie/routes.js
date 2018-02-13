const express = require('express');
const engines = require('consolidate');
const mongoDb = require('mongodb');
const bodyParser = require('body-parser');
const assert = require('assert');

var DB_CREDENTIALS = require('../../utils/dbConnectionConstants');

const movieSearchService = require('./searchService.js');

const app = module.exports = express();

app.use(bodyParser.json({"strict": true}));
app.use(bodyParser.urlencoded({ extended: true }));

// HTML conf
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

/**
 * Display de form to save a new movie
 */
app.get('/', function(req, res, next) {
    res.render('index');
});

/**
 * Display de form to save a new movie
 */
// app.get('/save_movie', function(req, res, next) {
//     res.render('movieForm', { 'model' : {'title': 'write a movie', 'year': '1993', 'imdb': 'http://...'} });
// });

/**
 * Save a new movie
 */
app.post('/movie', function(req, res, next) {
    console.log('save a movie');

    const TITLE = req.body.title;
    const YEAR = req.body.year;
    const IMDB = req.body.imdb;

    if (TITLE == '' || YEAR == '' || IMDB == '') {
        next('Please insert correct data');
        return;
    } else {

        const MOVIE = {
            'title': TITLE,
            'year': YEAR,
            'imdb': IMDB,
            toString: function() { return '[title: ' + this.title + ', year: ' + this.year + ', imdb: ' + this.imdb + ']'; }
        }
        
        mongoDb.MongoClient.connect(DB_CREDENTIALS.URI, (err, db) => {
        
            if (err) throw err
        
            console.log('inserting movie: ' + MOVIE.toString());
            db.db(DB_CREDENTIALS.DBNAME).collection('movie').insert(MOVIE);
    
            db.close();
        });
        
        res.status(200).send(MOVIE);
    }
    // res.status(200).send({'status': 'OK'});
});

/**
 * Method to research and display movies
 */
app.get('/movie', function(req, res, next) {

    var query = movieSearchService.getQueryWithFormParameters(req.query);
    var resultats = '';

    if(query.year || query.title || query.imdb) {

        mongoDb.MongoClient.connect(DB_CREDENTIALS.URI, function(err, db) {

            // assert.equal(err, null);c
            if(err) {
                next(err);
                return;
            }

            var options = {
                'projection' : {
                    '_id': 0,
                    'title': 1,
                    'year': 1,
                    'imdb': 1
                },
                'limit': 5
            };

            db.db(DB_CREDENTIALS.DBNAME).collection('movie').find(query, options).toArray((err, movies) => {

                res.status(200).send(movies);
            });

            // db.db(dbName).collection(collName).find(query, options).toArray((err, docs) => {docs.forEach(doc => ...)});
            // db.db(dbName).collection(collName).find(query, options).forEach(doc => ..., err => ...);

            db.close();
        });
    } else {

        // TODO throw an error

    }
});