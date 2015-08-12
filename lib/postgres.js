const pg = require('postgres-gen');
const dao = require('postgres-gen-dao');

function Database(connection) {
    this.db = pg(connection);
    this.tables = {};
}

Database.prototype.table = function (name) {
    this.tables[name] = dao({db: this.db, table: name})
};

module.exports = Database;