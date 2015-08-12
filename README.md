# rain-util #

io.js utilities

```
npm install && gulp
var $util = require('rain-util');
```

### http requests ###
```
var conn = { host: 'localhost', db: 'postgres', user: 'postgres', password: 'postgres' };

var api = new $util.http('https://maps.googleapis.com/');

var apiResponse = yield mapsApi._get('maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA');
console.log('apiResponse',apiResponse);
```

### orm w/ transactions ###
```
var $postgres =  new $util.postgres(conn); // connection string also acceptable

if($postgres) {
  $postgres.table('books');

  var b = { author: 'Johnny test', title: 'I Like Books'};

  $postgres.tables.books.upsert(b).then(function() {
    console.log(b.id + ' - ' + b.createdAt + ' - ' + b.updatedAt); // values are loaded back :)
  });

  $postgres.transaction(function*() {
    var b = yield $postgres.tables.books.findOne('id = ?', 1);  // b is book with id 1
    yield $postgres.dao.delete(b); // delete by model throws if more than one row is affected
    yield $postgres.dao.delete('published > 1967'); // delete by query, returns count
  });
}
```

### file utilities
```
$util.fs.upsert     - (string) creates dir if non-existent
$util.fs.objectify  - (string) converts directory and contents into node module
$util.download      - (string or array) downloads url(s) to file(s)
```
