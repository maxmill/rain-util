'use strict';

var pg = require('postgres-gen');
var dao = require('postgres-gen-dao');

function Database(connection) {
  /**
   * https://github.com/evs-chris/node-postgres-gen/blob/master/README.md
   * this.db
   * @methods
   * query | nonQuery | transaction
   */
  this.db = pg(connection);

  /**
   * https://github.com/evs-chris/postgres-gen-dao
   * this.table.objectName
   * @methods
   * find | findOne( [ conditions ], [ parameters ], [ options ] )
   * insert | update | upsert | delete( object, [ options ] )
   */
  this.tables = {};
}

Database.prototype.table = function (name) {
  undefined.tables[name] = dao({ db: undefined.db, table: name }); // load table data access object
};

module.exports = Database;