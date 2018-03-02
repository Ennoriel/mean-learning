const lodashSet = require('lodash/set');

module.exports = {

    /**
     * Intialize the Query object to perform DB search
     * @param {Object} parsedUrl parsed URL 
     */
    getQueryWithFormParameters: function(parsedUrl) {

        log("parsedUrl", parsedUrl);

        var query = setQuery(parsedUrl);
        
        log("query", query);

        return query;
    },

    /**
     * Check wether the bookmark is correct (ie. contains a name)
     * @param {Object} bookmark the bookmark
     * @param {Middleware} next the next middleware
     */
    isBookmarkCorrect: function(bookmark, next) {
        if (!bookmark.name) {
            next('Please insert a bookmark with a name');
            return false;
        }
        return true;
    }
}

/**
 * Log an object to the console
 * @param {Key} objectKey 
 * @param {Value} objectValue 
 */
function log(objectKey, objectValue) {
    console.log(objectKey + ': ');
    console.log(objectValue);
}

/**
 * Intialize the Query object to perform DB search
 * @param {Parsed URL} parsedUrl 
 */
function setQuery(parsedUrl) {

    let query = {};

    setStringQuery(query, 'name', parsedUrl.name);
    setArrayQuery(query, 'resources', 'name', parsedUrl.resourceName);
    setArrayQuery(query, 'resources', 'url', parsedUrl.resourceUrl);

    return query;
}

/**
 * Add a string criteria to the db query
 * @param {Object} query db query
 * @param {String} paramKey db param
 * @param {String} paramValue param value
 */
function setStringQuery(query, paramKey, paramValue) {
    if(paramValue) {
        query[paramKey] = {
            '$regex': paramValue,
            '$options': 'i'
        }
    }
}

/**
 * Add an array criteria to the db query
 * @param {Object} query db query
 * @param {String} arrayKey db param
 * @param {String} paramKey db param
 * @param {String} paramValue param value
 */
function setArrayQuery(query, arrayKey, paramKey, paramValue) {
    if(paramValue) {
        query[arrayKey + '.' + paramKey] = paramValue;
    }
}