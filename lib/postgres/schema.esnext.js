var co = require('co');
var schema = require('./schema');

module.exports = function(db){
    return function *() {
        var tables = schema.blackList((yield db.query(schema.queries.tables())).rows);
        var columns = (yield db.query(schema.queries.columns(tables))).rows;
        var indexes = (yield db.query(schema.queries.indexes)).rows;
        return schema.getEntities(tables, columns, indexes);
    };
};