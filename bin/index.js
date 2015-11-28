'use strict';

const http = require('./http');
const fs = require('./fs');
const postgres = require('./postgres');
const genify = require('thunkify-wrap').genify; // converts normal functions into generator functions
const array = require('array-generators');
// expose as one util
module.exports = {
    http: http,
    fs: fs,
    postgres: postgres,
    genify: genify,
    array: array
};