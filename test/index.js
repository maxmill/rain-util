const co = require('co');
const test = require('tape-catch');
const path = require('path');
const $util = require('../bin');
const fs = require('fs');
const $fs = $util.fs;
const testApi = {
    gmaps: new $util.http('https://maps.googleapis.com/', {'x-hi-there': 'hello'})
};


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

// need postgres installed for this test to pass
test('database query', function (t) {
    const conn = {host: 'localhost', db: 'development', user: 'postgres', password: 'postgres'};
    const $postgres = new $util.postgres(conn);
    co(function *() {
        var schema = (yield $postgres.db.query('SELECT 1')).rows;
        console.log(schema);
        Object.keys(schema).length > 0 ? t.pass('schema has properties') : t.fail('missing schema');
    });
    t.end();
});

//
//
//test('file download', function (t) {
//    co(function *() {
//        console.log('start')
//        var ss = yield $fs.rimraf(path.resolve('./data'));
//        var file = {
//            url: 'https://joyeur.files.wordpress.com/2011/07/nodejs.png',
//            src: (path.resolve('./data') + '/img.png')
//
//        };
//        yield $fs.upsert(path.resolve('./data'));
//        //console.info('found directory: ' + ());
//
//        var tt = yield $fs.download(file);
//
//        t.pass('file is downloaded');
//    });
//    t.end();
//});
