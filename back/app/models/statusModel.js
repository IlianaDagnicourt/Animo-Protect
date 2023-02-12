const CoreDatamapper = require('./coreDatamapper');
const client = require('../clients/database');

class Status extends CoreDatamapper {
    tableName = 'status';

}

module.exports = new Status(client);
