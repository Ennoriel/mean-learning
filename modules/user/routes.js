var express = require('express');
var userService = require('./user.service');
 
const app = module.exports = express();

// routes
app.post('/authenticate', authenticate);
app.post('/register', register);
app.get('/', getAll);
app.get('/current', getCurrent);
app.put('/:_id', update);
app.delete('/:_id', _delete);

/**
 * Authenticate a user
 */
function authenticate(req, res) {

    userService.authenticate(req.body.username, req.body.password)
        .then(function (user) {
            if (user) {
                // authentication successful
                res.send(user);
            } else {
                // authentication failed
                res.status(400).send('Username or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

/**
 * Register a user
 */
function register(req, res) {
    
    userService.create(req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

/**
 * Get all users
 */
function getAll(req, res) {
    
    userService.getAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

/**
 * Get one user by id
 */
function getCurrent(req, res) {
    
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

/**
 * Update a user
 */
function update(req, res) {
    userService.update(req.params._id, req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

/**
 * Delete a user
 */
function _delete(req, res) {
    userService.delete(req.params._id)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}