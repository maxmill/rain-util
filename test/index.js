var co = require('co');
var test = require('tape');
var path = require('path');

var $util = require('../bin');

var fs = require('fs');
const $fs = $util.fs;

var testApi = {
    gmaps: new $util.http('https://maps.googleapis.com/')
};
test('database schema', function (t) {
    // does't run if db not found
    var conn = {host: 'localhost', db: 'postgres', user: 'postgres', password: 'postgres'};
    var $postgres = new $util.postgres(conn);

    co(function *() {
        var schema = yield $postgres.schema();
        Object.keys(schema).length > 0 ? t.pass('schema has properties') : t.fail('missing schema');
    });
    t.end();
});

test('HTTP GET', function (t) {
    co(function *() {
        var response = yield testApi.gmaps._get('maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA');
        response.body ? t.pass('HTTP GET found response body') : t.fail('missing response body');
    });
    t.end();
});

//TODO : convert download to generator
//test('file download', function (t) {
//    co(function *() {
//        console.log('found directory: ' + (yield $fs.upsert(path.resolve('./data'))));
//        var file = {
//            url: 'https://joyeur.files.wordpress.com/2011/07/nodejs.png',
//            src: (path.resolve('./data') + '/img.png')
//
//        };
//
//       $fs.download(file);
//
//        (yield $fs.exists(file.src)) === true ? t.pass('file is downloaded') : t.fail('file not downloaded');
//    });
//    t.end();
//});