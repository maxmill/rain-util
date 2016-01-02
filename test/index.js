const co = require('co');
const test = require('tape-catch');
const path = require('path');
const $util = require('../bin');
const fs = require('fs');
const $fs = $util.fs;
const testApi = {
    gmaps: new $util.http('https://maps.googleapis.com/', {'x-hi-there': 'hello'}),
    endPoint: new $util.http('http://jsonplaceholder.typicode.com/')
};


const assertResponse = function (t, response) {
    return response.body
        ? t.pass('HTTP ' + response.request.method + ' found response body' + ' (' + response.statusCode + ')')
        : t.fail('HTTP ' + response.request.method + ' missing response body' + ' (' + response.statusCode + ')');
};

test('HTTP GET ', function (t) {
    co(function *() {
        var response = yield testApi.gmaps.get('maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA');
        assertResponse(t, response);
    });
    t.end();
});


test('HTTP GET 2x', function (t) {
    co(function *() {
        var response = yield testApi.gmaps.get('maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA');
        var response2 = yield testApi.endPoint.get('posts/1');
        (response.body && response2.body)
            ? t.pass('HTTP GET 2x found response bodies' + ' (' + response.statusCode + ', ' + response2.statusCode + ')')
            : t.fail('HTTP GET 2x missing response bodies' + ' (' + response.statusCode + ', ' + response2.statusCode + ')');
    });
    t.end();
});


test('HTTP POST', function (t) {
    co(function *() {
        var response = yield testApi.endPoint.post('posts/');
        assertResponse(t, response);
    });
    t.end();
});

test('HTTP PUT', function (t) {
    co(function *() {
        var response = yield testApi.endPoint.put('posts/1', {
            title: 'test put'
        });
        assertResponse(t, response);
    });
    t.end();
});

test('HTTP PATCH', function (t) {
    co(function *() {
        var response = yield testApi.endPoint.patch('posts/1', {
            title: 'test patch'
        });
        assertResponse(t, response);
    });
    t.end();
});


test('upsert recusively', function (t) {
    co(function *() {
        (yield $fs.rimraf(path.resolve('./data')));

        console.log('creating directory: ' + (yield $fs.upsert(['./data/1/2/3', './data/3/2/1'])));

        (yield $fs.exists('./data/1'))
            ? t.pass('recusively created')
            : t.fail('not created properly');
    });
    t.end();
});


test('JSON IO', function (t) {
    co(function *() {
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
    });
    t.end();
});

// need postgres installed for this test to pass
test('database query', function (t) {
    const conn = {host: 'localhost', db: 'rain_dev', user: 'postgres', password: 'postgres'};
    const $postgres = new $util.postgres(conn);
    co(function *() {
        var schema = (yield $postgres.db.query('SELECT 1')).rows;
        schema && Object.keys(schema).length > 0 ? t.pass('returned rows') : t.fail('missing rows');
    });
    t.end();
});