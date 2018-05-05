
var DB_CREDENTIALS = require('../../utils/dbConnectionConstants');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
const mongoDb = require('mongodb');
const ObjectId = mongoDb.ObjectID;
 
var service = {};
 
service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
 
module.exports = service;

/**
 * Authenticate a user
 * @param {string} username username
 * @param {string} password password
 */
function authenticate(username, password) {
    
    var deferred = Q.defer();
 
    mongoDb.MongoClient.connect(DB_CREDENTIALS.URI, function(err, db) {
        
        const user = db.db(DB_CREDENTIALS.DBNAME)
                .collection('users')
                .findOne({ 'username': username }, function (err, user) {

            if (err) deferred.reject(err.name + ': ' + err.message);
    
            if (user && bcrypt.compareSync(password, user.hash)) {
                // authentication successful
                deferred.resolve({
                    _id: user._id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: jwt.sign({ sub: user._id }, 'SECRET')
                });
            } else {
                // authentication failed
                deferred.resolve();
            }
        });
        db.close();
    });
 
    return deferred.promise;
}

/**
 * Create a user
 * @param {Object} userParam user
 */
function create(userParam) {
    
    var deferred = Q.defer();
 
    mongoDb.MongoClient.connect(DB_CREDENTIALS.URI, function(err, db) {
        

        // validation
        db.db(DB_CREDENTIALS.DBNAME)
                .collection('users')
                .findOne({ username: userParam.username },
                function (err, user) {
                    
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                
                createUser();
            }
        });

        db.close();

    });
 
    function createUser() {
        
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');
 
        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);
        
        mongoDb.MongoClient.connect(DB_CREDENTIALS.URI, function(err, db) {
                        
            if (err) deferred.reject(err.name + ': ' + err.message);

            db.db(DB_CREDENTIALS.DBNAME)
                    .collection('users')
                    .insert(user)
                    .then(() => {

                deferred.resolve();
            });
        });
    }
 
    return deferred.promise;
}

/**
 * Get all users
 */
function getAll() {
    
    var deferred = Q.defer();

    mongoDb.MongoClient.connect(DB_CREDENTIALS.URI, function(err, db) {
 
        db.db(DB_CREDENTIALS.DBNAME).collection('users').find().toArray(function (err, users) {
            if (err) deferred.reject(err.name + ': ' + err.message);
    
            // return users (without hashed passwords)
            users = _.map(users, function (user) {
                return _.omit(user, 'hash');
            });
    
            deferred.resolve(users);
        });

        db.close();

    });
 
    return deferred.promise;
}

/**
 * Get one user by id
 * @param {_id} _id id
 */
function getById(_id) {
    var deferred = Q.defer();

    mongoDb.MongoClient.connect(DB_CREDENTIALS.URI, function(err, db) {
 
        db.db(DB_CREDENTIALS.DBNAME).collection('users').find({'_id': ObjectId(_ID)}).toArray(function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);
    
            if (user) {
                // return user (without hashed password)
                deferred.resolve(_.omit(user, 'hash'));
            } else {
                // user not found
                deferred.resolve();
            }
        });

        db.close();

    });
 
    return deferred.promise;
}

/**
 * Update a user
 * @param {_id} _id id
 * @param {Object} userParam user
 */
function update(_id, userParam) {
    var deferred = Q.defer();
 
    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);
 
                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });
 
    function updateUser() {
        // fields to update
        var set = {
            firstName: userParam.firstName,
            lastName: userParam.lastName,
            username: userParam.username,
        };
 
        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }
 
        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
 
                deferred.resolve();
            });
    }
 
    return deferred.promise;
}

/**
 * Delete a user
 * @param {_id} _id id
 */
function _delete(_id) {
    
    var deferred = Q.defer();
 
    mongoDb.MongoClient.connect(DB_CREDENTIALS.URI, (err, db) => {
    
        if (err) throw err
    
        db.db(DB_CREDENTIALS.DBNAME)
        .collection('users')
        .deleteOne({'_id': ObjectId(_id)})
        .then(_ => {
    
            deferred.resolve();
        });
    
        db.close();
    });

    return deferred.promise;
}