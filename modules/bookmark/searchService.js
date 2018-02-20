

module.exports = {

    /**
     * Intialize the Query object to perform DB search
     * @param {Object} parsedUrl parsed URL 
     */
    getQueryWithFormParameters: function(parsedUrl) {

        log("parsedUrl", parsedUrl);

        var query = getQuery(parsedUrl);
        
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
function getQuery(parsedUrl) {

    let query = {};

    getStringQuery(query, 'name',   parsedUrl.name);
    getStringQuery(query, 'npm',    parsedUrl.npm);
    getStringQuery(query, 'github', parsedUrl.github);
    getStringQuery(query, 'web',    parsedUrl.web);

    return query;
}

/**
 * Add a criteria to the db query
 * @param {Object} query db query
 * @param {String} paramKey db param
 * @param {String} paramValue param value
 */
function getStringQuery(query, paramKey, paramValue) {
    if(paramValue) {
        query[paramKey] = {
            '$regex': paramValue,
            '$options': 'i'
        }
    }
}