# rain-util #

[![Build Status](https://travis-ci.org/maxmill/rain-util.svg)](https://travis-ci.org/maxmill/rain-util)

Simplistic generator based toolkit for consuming apis, accessing postgres, and managing filesystem

```
npm i rain-util
var $util = require('rain-util');
```

### http requests ###
extends request.js additional properties may be passed as params  (httpSignature, multipart, headers)
```
var api = new $util.http('https://maps.googleapis.com/');
var api2 = new $util.http('https://my.api.com/',
  { 'x-default-header':'its value'},
  {httpSignature:{keyId:'rsa-key-1',algorithm='rsa-sha256',signature:'Base64(RSA-SHA256(signing string))'}
);

var req = new $util.http();

var apiResponse = yield mapsApi.get('maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA');
console.log('apiResponse',apiResponse);
req.get('full url');

var api2Response = yield api2.post('another url', requestBody);
```

### postgres ###
queries, data access objects, transactions, schema lookup
```
var conn = { host: 'localhost', db: 'postgres', user: 'postgres', password: 'postgres' };
var $postgres =  new $util.postgres(conn); // connection string also acceptable

if($postgres) {
  postgres.db.query('SELECT test');

  $postgres.table('books');

  var b = { author: 'Johnny test', title: 'I Like Books'};

  $postgres.tables.books.upsert(b).then(function() {
    console.log(b.id + ' - ' + b.createdAt + ' - ' + b.updatedAt); // values are loaded back :)
  });

  $postgres.db.transaction(function*() {
    var b = yield $postgres.tables.books.findOne('id = ?', 1);  // b is book with id 1
    yield $postgres.dao.delete(b); // delete by model throws if more than one row is affected
    yield $postgres.dao.delete('published > 1967'); // delete by query, returns count
  });

}
```


### generator utilities ###
```
util.genify - (function) convert regular functions into generator functions
util.array.(forEach|map|filter|forEachSeries)
```

### file utilities ###
extends co-fs - all core node fs methods available as generators
```
$util.fs.download   - (file or file array) downloads url(s) to file(s)
$util.fs.upsert     - (dir or dir array) creates dir if non-existent (uses mkdirp)
$util.fs.fetch     - (file or dir) read file or directory contents
$util.fs.rimraf     - (path) yieldable rm -rf
$util.fs.objectify          - (path) converts directory and contents into node module
$util.fs.json.(read|write)  - (file, obj, options)
```

requires node 4.2 or higher

### credits ###

- https://github.com/request/request
- https://github.com/jprichardson/node-jsonfile
- https://github.com/substack/node-mkdirp
- https://github.com/evs-chris/node-postgres-gen
- https://www.npmjs.com/package/array-generators
- https://github.com/tj/co
- https://github.com/substack/tape
