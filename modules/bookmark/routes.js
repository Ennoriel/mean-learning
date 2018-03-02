const express = require('express');
const engines = require('consolidate');
const mongoDb = require('mongodb');
const bodyParser = require('body-parser');
const ObjectId = mongoDb.ObjectID;

var DB_CREDENTIALS = require('../../utils/dbConnectionConstants');

const bookmarkSearchService = require('./searchService.js');

const app = module.exports = express();

app.use(bodyParser.json({"strict": true}));
app.use(bodyParser.urlencoded({ extended: true }));

// HTML conf
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

/**
 * Search bookmarks
 */
app.get('/bookmark', function(req, res, next) {

    var query = bookmarkSearchService.getQueryWithFormParameters(req.query);

    mongoDb.MongoClient.connect(DB_CREDENTIALS.URI, function(err, db) {

        if(err) {
            next(err.message);
            return;
        }

        var options = {
            'projection' : {
                '_id': 1,
                'name': 1,
                'npm': 1,
                'github': 1,
                'web': 1,
                'url': 1
            },
            'limit': 20
        };

        db.db(DB_CREDENTIALS.DBNAME).collection('bookmark').find(query, options).toArray((err, bookmarks) => {

            res.status(200).send(bookmarks);
        });

        // db.db(dbName).collection(collName).find(query, options).toArray((err, docs) => {docs.forEach(doc => ...)});
        // db.db(dbName).collection(collName).find(query, options).forEach(doc => ..., err => ...);

        db.close();
    });
});

/**
 * Save a new bookmark
 */
app.post('/bookmark', function(req, res, next) {
    console.log('save a bookmark');

    const BOOKMARK = req.body;

    if (!bookmarkSearchService.isBookmarkCorrect(BOOKMARK, next)) return;
        
    mongoDb.MongoClient.connect(DB_CREDENTIALS.URI, (err, db) => {
    
        if (err) throw err
    
        console.log('inserting bookmark: ' + BOOKMARK.name);
        db.db(DB_CREDENTIALS.DBNAME).collection('bookmark').insert(BOOKMARK);

        db.close();
    });
    
    res.status(200).send(BOOKMARK);
});

/**
 * Update a bookmark
 */
app.put('/bookmark/:bookmarkId', function(req, res, next) {
    console.log('update a bookmark.');

    const BOOKMARK = req.body;
    delete BOOKMARK._id;
    
    const _ID = req.params.bookmarkId;

    if (!bookmarkSearchService.isBookmarkCorrect(BOOKMARK, next)) return;
    
    mongoDb.MongoClient.connect(DB_CREDENTIALS.URI, (err, db) => {
    
        if (err) throw err
    
        console.log('updating bookmark: ' + BOOKMARK.name);
        db.db(DB_CREDENTIALS.DBNAME)
          .collection('bookmark')
          .update({'_id': ObjectId(_ID)}, BOOKMARK)
          .then(_ => {
    
            BOOKMARK._id = _ID;
            res.status(200).send(BOOKMARK);
        });

        db.close();
    });
});

/**
 * Delete a bookmark
 */
app.delete('/bookmark/:bookmarkId', function(req, res, next) {
    console.log('Delete the bookmark: ' + req.params.bookmarkId);

    const _ID = req.params.bookmarkId;
    console.log(_ID);
    
    mongoDb.MongoClient.connect(DB_CREDENTIALS.URI, (err, db) => {
    
        if (err) throw err
    
        db.db(DB_CREDENTIALS.DBNAME)
          .collection('bookmark')
          .deleteOne({'_id': ObjectId(_ID)})
          .then(_ => {
    
            res.status(200).send({'status': 'OK'});
        });

        db.close();
    });
});

app.use(
    function errorHandler(err, req, res, next) {
        console.error('error: ' + err);
        res.status(400).send({ 'message': err });
    }
);