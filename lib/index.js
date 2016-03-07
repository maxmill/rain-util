const http = require('./http');
const fs = require('./fs');
const postgres = require('./postgres');
const genify = require('thunkify-wrap').genify; // converts normal functions into generator functions
const array = require('array-generators');
const download = require('./download');

module.exports = // util hash
{
    download: download,
    http: http,
    fs: fs,
    postgres: postgres,
    genify: genify,
    array: array
};
