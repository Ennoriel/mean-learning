
var DB_CREDENTIALS = require('../../utils/dbConnectionConstants');
const queryService = require("./../../shared/query.service");
var Q = require('q');
const mongoDb = require('mongodb');
const ObjectId = mongoDb.ObjectID;

var service = module.exports = {
	getAll: getAll,
	get: get,
	create: create,
	update: update,
	delete: _delete
};

/**
 * get all resources of a bookmark
 */
function getAll(_id, bookmarkSO) {

    var deferred = Q.defer();
 
    mongoDb.MongoClient.connect(DB_CREDENTIALS.URI, function(err, db) {

        db.db(DB_CREDENTIALS.DBNAME).collection('bookmark')
                                    .aggregate(getAgregateQuery(_id, undefined, bookmarkSO))
                                    .toArray(function (err, resources) {

            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve(resources);
        });

        db.close();

    });
    
    return deferred.promise;
}

/**
 * get a resource
 */
function get(_id, resourceName) {
    
    var deferred = Q.defer();
 
    mongoDb.MongoClient.connect(DB_CREDENTIALS.URI, function(err, db) {

        db.db(DB_CREDENTIALS.DBNAME).collection('bookmark')
                                    .aggregate(getAgregateQuery(_id, resourceName))
                                    .toArray(function (err, resources) {

            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve(resources);
        });

        db.close();

    });
    
    return deferred.promise;
}

/**
 * create a resource
 */
function create(bookmarkId, resource) {
    
    var deferred = Q.defer();

    if (!queryService.is_idOk(bookmarkId)) {
        deferred.reject('An error occurend while creating the resource.');
        return deferred.promise;
    }
 
    mongoDb.MongoClient.connect(DB_CREDENTIALS.URI, function(err, db) {

        if (err) deferred.reject(err.name + ': ' + err.message);

        db.db(DB_CREDENTIALS.DBNAME).collection('bookmark')
            .updateOne(
                {
                    '_id': ObjectId(bookmarkId)
                },
                {
                    '$addToSet': {
                        'resources': resource
                    }
                })
            .then(response => {

                if (response.modifiedCount > 0) {
                    deferred.resolve(resource);
                } else {
                    deferred.resolve();
                }

            }).catch(updateErr => {
                deferred.reject('An error occurend while creating the resource.');
            });

            db.close();

    });

    return deferred.promise;
}

/**
 * update a resource
 */
function update(bookmarkId, resourceName, resource) {
    
    var deferred = Q.defer();
 
    mongoDb.MongoClient.connect(DB_CREDENTIALS.URI, function(err, db) {

        if (err) deferred.reject(err.name + ': ' + err.message);

        db.db(DB_CREDENTIALS.DBNAME).collection('bookmark')
                .updateOne(
                    {
                        '_id': ObjectId(bookmarkId),
                        'resources.name': resourceName
                    },
                    {
                        '$set': { 'resources.$': resource }
                    })
                .then(response => {

                    if (response.modifiedCount > 0) {
                        deferred.resolve(resource);
                    } else {
                        deferred.resolve();
                    }

                }).catch(updateErr => {
                    deferred.reject('An error occurend while updating the resource.');
                });

        db.close();

    });
    
    return deferred.promise;
}

/**
 * delete a resource
 */
function _delete(bookmarkId, resourceName) {
    
    var deferred = Q.defer();
 
    mongoDb.MongoClient.connect(DB_CREDENTIALS.URI, function(err, db) {

        if (err) deferred.reject(err.name + ': ' + err.message);

        db.db(DB_CREDENTIALS.DBNAME).collection('bookmark')
                .updateOne(
                    {
                        '_id': ObjectId(bookmarkId)
                    },
                    {
                        '$pull': { 'resources': { 'name': resourceName } }
                    })
                .then(response => {

                    deferred.resolve(response.modifiedCount);

                }).catch(updateErr => {
                    deferred.reject('An error occurend while deleting the resource.');
                });

        db.close();

    });
    
    return deferred.promise;
}

function getAgregateQuery(bookmarkId, exactRessourceName, bookmarkSO) {
    var agregateQuery = [];

    if(bookmarkId !== undefined) {
        agregateQuery.push({ 
            '$match': { '_id': ObjectId(bookmarkId) }
        });
    }

    agregateQuery.push({ 
        '$unwind': '$resources'
    });

    const queryObject = {};

    if(exactRessourceName) {
        queryObject['$match'] = {};
        queryObject['$match']['resources.name'] = exactRessourceName;
    }
    
    if(bookmarkSO && bookmarkSO.name) {
        queryObject['$match'] = queryObject['$match'] || {};
        queryObject['$match']['name'] = {
            '$regex': bookmarkSO.name,
            '$options': 'i'
        }
    } 

    if(bookmarkSO && bookmarkSO.resourceName) {
            queryObject['$match'] = queryObject['$match'] || {};
        queryObject['$match']['resources.name'] = {
            '$regex': bookmarkSO.resourceName,
            '$options': 'i'
        }
    }
    
    if(bookmarkSO && bookmarkSO.resourceUrl) {
        queryObject['$match'] = queryObject['$match'] || {};
        queryObject['$match']['resources.link'] = {
            '$regex': bookmarkSO.resourceUrl,
            '$options': 'i'
        }
    }

    if(queryObject.$match) {
        agregateQuery.push(queryObject);
    }

    // else {
    //     agregateQuery.push({ 
    //         '$match': { 'resources': { '$exists': true } }
    //     });
    // }

    // agregateQuery.push({ 
    //     '$replaceRoot': { 'newRoot': '$resources' }
    // });

    agregateQuery.push({ 
        '$sort' : { 'name' : 1 }
    });
    console.log(agregateQuery);
    
    return agregateQuery;
}