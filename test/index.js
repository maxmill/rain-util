const test = require('tape-catch');
const $util = require('../bin');
const $download = require('../bin/download');
const coTape = require('co-tape');
const path =require('path');

require('rain-util-fs/test');
require('rain-util-postgres/test');
require('rain-util-http/test');
require('rain-util-download/test');


test('file download from rain-util/download', coTape(function* (t) {
    var file = {
        url: 'https://joyeur.files.wordpress.com/2011/07/nodejs.png',
        src: (path.resolve('./img.png') )
    };

    var filePath = (yield $download(file));
    console.log(filePath);

    var passed = yield $util.fs.exists(file.src);
    t[passed === true ? 'pass' : 'fail']('file download');

    t.end();
}));


test('file download from rain-util/fs.download', coTape(function* (t) {
    var file = {
        url: 'https://joyeur.files.wordpress.com/2011/07/nodejs.png',
        src: (path.resolve('./img.png') )
    };

    var filePath = (yield $util.fs.download(file));
    console.log(filePath);

    var passed = yield $util.fs.exists(file.src);
    t[passed === true ? 'pass' : 'fail']('file download');

    t.end();
}));

function getTimeMSFloat() {
    var hrtime = process.hrtime();
    return ( hrtime[0] * 1000000 + hrtime[1] / 1000 ) / 1000;
}
const testNumbers = [1, 2, 3];


test('array* map', coTape(function* (t) {
    const addedNumbers = yield $util.array.map(testNumbers, function*(n) {
        return n + 1;
    });

    var passed = (addedNumbers[0] - testNumbers[0]) === 1;//
    t[passed === true ? 'pass' : 'fail']('array* map');

    t.end();
}));

test('array* forEach', coTape(function* (t) {
    const addedNumbers = [];

    yield $util.array.forEach(testNumbers, function*(n) {
        addedNumbers.push(n + 1);
    });

    var passed = (addedNumbers[0] - testNumbers[0]) === 1;//
    t[passed === true ? 'pass' : 'fail']('array* forEach');

    t.end();
}));

test('array* forEachSeries', coTape(function* (t) {
    const startTime = getTimeMSFloat();
    const addedNumbers = [];
    yield $util.array.forEachSeries(testNumbers, function*(n) {
        addedNumbers.push(getTimeMSFloat() - startTime);
    });
    var passed = addedNumbers[0] < addedNumbers[1] && addedNumbers[1] < addedNumbers[2];
    t[passed === true ? 'pass' : 'fail']('array* forEachSeries');

    t.end();
}));