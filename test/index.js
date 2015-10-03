var co = require('co');
var test = require('tape-catch');
var path = require('path');

var $util = require('../bin');

var fs = require('fs');
const $fs = $util.fs;


var testApi = {
    gmaps: new $util.http('https://maps.googleapis.com/', {'x-hi-there': 'hello'})
};
var conn = {host: 'localhost', db: 'intacsaas_development', user: 'postgres', password: 'postgres'};
var $postgres = new $util.postgres(conn);


test('database schema', function (t) {
   // does't run if db not found
   var conn = {host: 'localhost', db: 'intacsaas_development', user: 'postgres', password: 'postgres'};
   var $postgres = new $util.postgres(conn);

   co(function *() {
       var schema = (yield $postgres.db.query('SELECT 1')).rows;
       console.log(schema)
       Object.keys(schema).length > 0 ? t.pass('schema has properties') : t.fail('missing schema');
   });
   t.end();
});
//
test('HTTP GET', function (t) {
    co(function *() {
        var response = yield testApi.gmaps.get('maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA');
        response.body ? t.pass('HTTP GET found response body') : t.fail('missing response body');
    });
    t.end();
});


test('upsert recusively', function (t) {
    co(function *() {
        (yield $fs.rimraf(path.resolve('./data')));
        console.log('creating directory: ' + (yield $fs.upsert(path.resolve('./data/1/2/3'))));

        (yield $fs.exists(path.resolve('./data/1')))
            ? t.pass('recusively created')
            : t.fail('not created properly');
    });
    t.end();
});
//
//
//test('file download', function (t) {
//    co(function *() {
//        var ss=yield $fs.rimraf(path.resolve('./data'));
//        var file = {
//            url: 'https://joyeur.files.wordpress.com/2011/07/nodejs.png',
//            src: (path.resolve('./data') + '/img.png')
//
//        };
//        console.info('found directory: ' + (yield $fs.upsert(path.resolve('./data'))));
//
//        var tt=yield $fs.download(file);
//        console.log(file)
//        (yield $fs.exists(file.src)) ? t.pass('file is downloaded') : t.fail('file not downloaded');
//    });
//    t.end();
//});
