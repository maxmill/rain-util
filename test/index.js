const test = require('tape-catch');
const $util = require('../bin');
const coTape = require('co-tape');

require('rain-util-fs/test')();
require('rain-util-postgres/test');
require('rain-util-http/test');
