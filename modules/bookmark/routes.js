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
    const _ID = req.params.bookmarkId;

    if (!bookmarkSearchService.isBookmarkCorrect(BOOKMARK, next)) return;
    
    mongoDb.MongoClient.connect(DB_CREDENTIALS.URI, (err, db) => {
    
        if (err) throw err
    
        console.log('updating bookmark: ' + BOOKMARK.name);
        db.db(DB_CREDENTIALS.DBNAME).collection('bookmark').update({'_id': ObjectId(_ID)}, BOOKMARK);

        db.close();
    });
    
    res.status(200).send(BOOKMARK);
});

/**
 * Delete a bookmark
 */
app.delete('/bookmark/:bookmarkId', function(req, res, next) {
    console.log('Delete the bookmark: ' + req.params.bookmarkId);

    const _ID = req.params.bookmarkId;
    
    mongoDb.MongoClient.connect(DB_CREDENTIALS.URI, (err, db) => {
    
        if (err) throw err
    
        db.db(DB_CREDENTIALS.DBNAME).collection('bookmark').deleteOne({'_id': ObjectId(_ID)});

        db.close();
    });
    
    res.status(200).send({'status': 'OK'});
});

/**
 * Method to research and display bookmarks
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
                'web': 1
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
