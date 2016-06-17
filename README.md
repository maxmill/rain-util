# rain-util #

[![Build Status](https://travis-ci.org/maxmill/rain-util.svg?style=flat-square)](https://travis-ci.org/maxmill/rain-util)
[![npm](https://img.shields.io/npm/v/rain-util.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/dt/rain-util.svg)]()
[![npm](https://img.shields.io/npm/dm/rain-util.svg)]()


generator based toolkit for consuming apis, accessing postgres, and managing filesystem

```
npm i rain-util
const $util = require('rain-util');
```

### for fast prototyping. use sub-packages if only a subset is needed ###
- https://github.com/maxmill/rain-util-http
- https://github.com/maxmill/rain-util-download
- https://github.com/maxmill/rain-util-fs
- https://github.com/maxmill/rain-util-postgres


### http requests ###
extends request.js additional properties may be passed as params  (httpSignature, multipart, headers)
```
const api = new $util.http('https://maps.googleapis.com/');
const api2 = new $util.http('https://my.api.com/',
  { 'x-default-header':'its value'},
  {httpSignature:{keyId:'rsa-key-1',algorithm='rsa-sha256',signature:'Base64(RSA-SHA256(signing string))'}
);

const req = new $util.http();

const apiResponse = yield mapsApi.get('maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA');
console.log('apiResponse',apiResponse);
req.get('full url');

const api2Response = yield api2.post('another url', requestBody);
```

### postgres ###
queries, data access objects, transactions, schema data
```
const conn = { host: 'localhost', db: 'postgres', user: 'postgres', password: 'postgres' };
const $postgres =  new $util.postgres(conn); // connection string also acceptable

if($postgres) {
  postgres.db.query('SELECT test');
// create a test table
        const tableName = 'testers';
        const testTable = `DROP TABLE IF EXISTS ${tableName}; CREATE TABLE ${tableName}(id CHARACTER constYING(40))WITH(OIDS=FALSE);ALTER TABLE ${tableName} OWNER TO postgres;`;
        yield $postgres.db.query(testTable);

// load created table into $postgres object
        $postgres.table(tableName);

// add a record
        const recordId = '4a2b';
        yield $postgres.tables[`${tableName}`].upsert({id: recordId});

// find created record using dao
        const daoRecord = yield  $postgres.tables[`${tableName}`].findOne('id = ?', recordId);

// find created record using sql
        const findRecordSQL = `SELECT * FROM ${tableName} WHERE id = '${recordId}'`;
        const sqlRecord = (yield $postgres.db.query(findRecordSQL)).rows[0];

// add new record
  $postgres.tables.books.upsert({id:'4324'})

//within transaction, find new record and then delete it
  $postgres.db.transaction(function*() {
    let record = yield $postgres.tables[`${tableName}`].findOne('id = ?', '4324');  
    yield $postgres.dao.delete(record); // delete by model throws if more than one row is affected
    yield $postgres.dao.delete('id = 4324'); // delete by query, returns count
  });
}


// get schema information
const schema = yield $postgres.schema();
```


### generator utilities ###
```
util.genify - (function) convert regular functions into generator functions
yield util.array.(forEach|map|filter|forEachSeries)
```

### file utilities ###
extends co-fs - all core node fs methods available as generators
```
$util.fs.download   - (file or file array) downloads url(s) to file(s)
$util.fs.upsert     - (dir or dir array) creates dir if non-existent (uses mkdirp)
$util.fs.fetch     - (file or dir) read file or directory contents
$util.fs.rimraf     - (path) yieldable rm -rf
$util.fs.json.(read|write)  - (file, obj, options)
```


requires node 4.2 or higher

### credits ###

- https://github.com/request/request
- https://github.com/jprichardson/node-jsonfile
- https://github.com/substack/node-mkdirp
- https://github.com/evs-chris/node-postgres-gen
- https://www.npmjs.com/package/array-generators
