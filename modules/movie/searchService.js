

module.exports = {

    /**
     * Intialize the Query object to perform DB search
     */
    getQueryWithFormParameters: function(parsedUrl) {

        log("parsedUrl", parsedUrl);

        var query = getQuery(parsedUrl);
        
        log("query", query);

        return query;
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

    if(parsedUrl.yearMin && parsedUrl.yearMax) {
        query.year = {
            "$gte": parsedUrl.yearMin,
            "$lte": parsedUrl.yearMax
        }
    } else if (parsedUrl.yearMin) {
        query.year = {
            "$gte": parsedUrl.yearMin
        }
    } else if (parsedUrl.yearMax) {
        query.year = {
            "$lte": parsedUrl.yearMax
        }
    }

    if(parsedUrl.title) {
        query.title = {
            '$regex': parsedUrl.title,
            '$options': 'i'
        }
    }
    
    if(parsedUrl.imdb) {
        query.imdb = {
            '$regex': parsedUrl.imdb,
            '$options': 'i'
        }
    }

    return query;
}
