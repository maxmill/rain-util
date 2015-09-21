var co = require('co');
var schema = require('./schema');

module.exports = function (db, namespace) {
    var queries = schema.queries(namespace);
    return function *() {
        var tables = (yield db.query(queries.tables)).rows;
        var columns = (yield db.query(queries.columns)).rows;
        var indexes = (yield db.query(queries.indexes)).rows;
        var constraints = (yield db.query(queries.constraints)).rows;

        return schema.getEntities(tables, columns, indexes, constraints);
    };
};