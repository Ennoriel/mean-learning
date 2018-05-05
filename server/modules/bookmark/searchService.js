const queryService = require("./../../shared/query.service");

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

    queryService.setRegexStringQuery(query, 'name', parsedUrl.name);
    queryService.setRegexArrayQuery(query, 'resources', 'name', parsedUrl.resourceName);
    queryService.setRegexArrayQuery(query, 'resources', 'link', parsedUrl.resourceUrl);

    return query;
}