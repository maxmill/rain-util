const test = require('tape-catch');
const $util = require('../bin');
const download = require('../bin/download');
const coTape = require('co-tape');
const path = require('path');
const debug = require('debug')('test');

// require('rain-util-fs/test');
// require('rain-util-postgres/test');
// require('rain-util-http/test');
// require('rain-util-download/test');

function getTimeMSFloat() {
  const hrtime = process.hrtime();
  return ((hrtime[0] * 1000000) + (hrtime[1] / 1000)) / 1000;
}
const testNumbers = [1, 2, 3];

function* runFromUtilDownload(t) {
  const file = {
    url: 'https://joyeur.files.wordpress.com/2011/07/nodejs.png',
    src: (path.resolve('./img.png'))
  };

  const filePath = (yield download(file));
  debug(filePath);

  const passed = yield $util.fs.exists(file.src);
  t[passed === true ? 'pass' : 'fail']('file download');

  t.end();
}

function* runFromFsDownload(t) {
  const file = {
    url: 'https://joyeur.files.wordpress.com/2011/07/nodejs.png',
    src: (path.resolve('./img.png'))
  };

  const filePath = (yield $util.fs.download(file));
  debug(filePath);

  const passed = yield $util.fs.exists(file.src);
  t[passed === true ? 'pass' : 'fail']('file download');

  t.end();
}
function* runArrayMapTest(t) {
  const addedNumbers = yield $util.array.map(testNumbers, function* (n) {
    return n + 1;
  });

  const passed = (addedNumbers[0] - testNumbers[0]) === 1;//
  t[passed === true ? 'pass' : 'fail']('array* map');

  t.end();
}
function* runArrayForEach(t) {
  const addedNumbers = [];

  yield $util.array.forEach(testNumbers, function* (n) {
    addedNumbers.push(n + 1);
  });

  const passed = (addedNumbers[0] - testNumbers[0]) === 1;//
  t[passed === true ? 'pass' : 'fail']('array* forEach');

  t.end();
}
function* runArrayForEacSeries(t) {
  const startTime = getTimeMSFloat();
  const addedNumbers = [];
  yield $util.array.forEachSeries(testNumbers, function* () {
    return addedNumbers.push(getTimeMSFloat() - startTime);
  });
  const passed = addedNumbers[0] < addedNumbers[1] && addedNumbers[1] < addedNumbers[2];
  t[passed === true ? 'pass' : 'fail']('array* forEachSeries');

  t.end();
}


test('file download from rain-util/download', coTape(runFromUtilDownload));
test('file download from rain-util/fs.download', coTape(runFromFsDownload));
test('array* map', coTape(runArrayMapTest));
test('array* forEach', coTape(runArrayForEach));
test('array* forEachSeries', coTape(runArrayForEacSeries));
