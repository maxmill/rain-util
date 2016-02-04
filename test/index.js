const co = require('co');
const test = require('tape-catch');
const path = require('path');
const $util = require('../bin');
const fs = require('fs');
const $fs = $util.fs;
const coTape = require('co-tape');
const httpTest =require('co-http-test');
const testApi = {
    gmaps: new $util.http('https://maps.googleapis.com/', {'x-hi-there': 'hello'}),
    endPoint: new $util.http('http://jsonplaceholder.typicode.com/')
};

httpTest('HTTP | GET , GET multiple', [
    testApi.gmaps.get('maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA'),
    testApi.endPoint.get('posts/1')
]);

httpTest('HTTP | POST, PUT, PATCH', [
    testApi.endPoint.post('posts/'),
    testApi.endPoint.put('posts/1', {
        title: 'test put'
    }),
    testApi.endPoint.patch('posts/1', {
        title: 'test patch'
    })
]);


test('upsert recusively', coTape(function* (t) {
    yield $fs.rimraf(path.resolve('./data'));
    console.log('creating directory: ' + (yield $fs.upsert(['./data/1/2/3', './data/3/2/1'])));

    var passed = (yield $fs.exists('./data/1'));
    t[passed === true ? 'pass' : 'fail']('upsert recusively');

    t.end();
}));


test('JSON IO', coTape(function* (t) {
    // write object to file
    yield $util.fs.json.write('./data/jsonObject.json', {testObject: 'me'});

    if (yield $fs.exists('./data/jsonObject.json')) {
        t.pass('JSON IO writes json files successfully');

        // read file to object
        var jsonObject = yield $util.fs.json.read('./data/jsonObject.json');

        (jsonObject.testObject === 'me')
            ? t.pass('JSON IO reads json succesfully')
            : t.fail('JSON IO failed to read');
    } else {
        t.fail('JSON IO failed to write json');
    }
    t.end();
}));


test('file download', coTape(function* (t) {
    var file = {
        url: 'https://joyeur.files.wordpress.com/2011/07/nodejs.png',
        src: (path.resolve('./data') + '/img.png')
    };

    var filePath = (yield $fs.download(file));
    console.log(filePath);

    var passed = (yield $fs.exists(file.src));
    t[passed === true ? 'pass' : 'fail']('file download');

    t.end();
}));

// need postgres installed for this test to pass
test('database query', coTape(function* (t) {
    var conn = {host: 'localhost', db: 'rain_dev', user: 'postgres'};
    var $postgres = new $util.postgres(conn);

    var schema = (yield $postgres.db.query('SELECT 1')).rows;
    var passed = schema && Object.keys(schema).length > 0;

    t[passed === true ? 'pass' : 'fail']('file download');

    t.end();
}));