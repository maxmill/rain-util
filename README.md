# rain-util #

node v4 utilities

```
npm install
var $util = require('rain-util');
```

### http requests ###
//extends request.js additional properties may be passed as params  (httpSignature, multipart, headers)
```
var api = new $util.http('https://maps.googleapis.com/');
var req = new $util.http();

var apiResponse = yield mapsApi.get('maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA');
console.log('apiResponse',apiResponse);
req.get('full url');
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

```
util.genify - convert regular functions into generator functions
```

### file utilities
extends co-fs - all core node fs methods available as generators
```
$util.fs.download   - (string or array) downloads url(s) to file(s)
$util.fs.upsert     - (string) creates dir if non-existent (uses mkdirp)
$util.fs.gather     - [file or path) read file or directory
$util.fs.rimraf     - (string) yieldable rm -rf
$util.fs.objectify  - (string) converts directory and contents into node module

```
