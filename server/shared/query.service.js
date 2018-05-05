module.exports = {
    
    /**
     * Add a string criteria to the db query
     * @param {Object} query db query
     * @param {String} paramKey db param
     * @param {String} paramValue param value
     */
    setStringQuery: function(query, paramKey, paramValue) {
        if(paramValue) {
            query[paramKey] = paramValue
        }
    },
    
    /**
     * Add a regex string criteria to the db query
     * @param {Object} query db query
     * @param {String} paramKey db param
     * @param {String} paramValue param value
     */
    setRegexStringQuery: function(query, paramKey, paramValue) {
        if(paramValue) {
            query[paramKey] = getRegexQueryObject(paramValue)
        }
    },

    /**
     * Add a regex array criteria to the db query
     * @param {Object} query db query
     * @param {String} arrayKey db param
     * @param {String} paramKey db param
     * @param {String} paramValue param value
     */
    setRegexArrayQuery: function(query, arrayKey, paramKey, paramValue) {
        this.setRegexStringQuery(query, arrayKey + '.' + paramKey, paramValue);
    },

    /**
     * Check if an _id field is correct
     * @param {boolean} _id the id to test
     * @returns {boolean} results of the check
     */
    is_idOk: function(_id) {
        if(/[a-f0-9]{24}/.test(_id)) {
            return true;
        }
        return false;
    }
}

function getRegexQueryObject(paramValue) {
    return {
        '$regex': paramValue,
        '$options': 'i'
    }
}