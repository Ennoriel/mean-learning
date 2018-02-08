
const nconf = require('nconf');

nconf.argv().env().file('keys.json');

const DB_CREDENTIALS = module.exports = {

    'USER': nconf.get('mongoUser'),
    'PASS': nconf.get('mongoPass'),
    'HOST': nconf.get('mongoHost'),
    'PORT': nconf.get('mongoPort'),
    'DBNAME': nconf.get('mongoDatabase'),

    'URI': 'mongodb://' + nconf.get('mongoUser') +
            ':' + nconf.get('mongoPass') +
            '@' + nconf.get('mongoHost') +
            ':' + nconf.get('mongoPort') +
            '/' + nconf.get('mongoDatabase')

};