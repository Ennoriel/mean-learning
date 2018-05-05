var express = require('express');
var resourceService = require('./resource.service');
 
const app = module.exports = express();

// routes
app.get('/bookmark/resources', getAll);
app.get('/bookmark/:bookmark_id/resources', getAll);
app.get('/bookmark/:bookmark_id/resource/:resource_name', get);
app.post('/bookmark/:bookmark_id/resources', create);
app.put('/bookmark/:bookmark_id/resource/:resource_name', update);
app.delete('/bookmark/:bookmark_id/resource/:resource_name', _delete);
app.use(errorHandler);

/**
 * Get all resources
 */
function getAll(req, res, next) {
    
    resourceService.getAll(req.params.bookmark_id, req.query)
        .then(function (resources) {
            res.send(resources);
        })
        .catch(function (err) {
            next(err);
        });
}

/**
 * Get a resource
 */
function get(req, res, next) {
    
    resourceService.get(req.params.bookmark_id, req.params.resource_name)
        .then(function (resource) {
            res.send(resource);
        })
        .catch(function (err) {
            next(err);
        });
}

/**
 * Save a new resource
 */
function create(req, res, next) {
    
    resourceService.create(req.params.bookmark_id, req.body)
        .then(function (resource) {
            res.status(200).send(resource);
        })
        .catch(function (err) {
            next(err);
        });
}

/**
 * Update a resource
 */
function update(req, res, next) {
    
    resourceService.update(req.params.bookmark_id, req.params.resource_name, req.body)
        .then(function (resource) {
            res.status(200).send(resource);
        })
        .catch(function (err) {
            next(err);
        });
}

/**
 * Remove a resource
 */
function _delete(req, res, next) {
    
    resourceService.delete(req.params.bookmark_id, req.params.resource_name)
        .then(function (deletedCount) {
            if(deletedCount > 0) {
                res.json('success');
            } else {
                res.json('nothing');
            }
        })
        .catch(function (err) {
            next(err);
        });
}

function errorHandler(err, req, res, next) {
    console.error('error: ' + err);
    res.status(400).send({ 'message': err });
    // next();
}