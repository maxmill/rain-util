'use strict';

var _http = require('./http');
var _fs = require('./fs');
var _postgres = require('./postgres');
var genify = require('thunkify-wrap').genify; // converts normal functions into generator functions

// expose as one util
module.exports = {
    http: _http,
    fs: _fs,
    postgres: _postgres,
    genify: genify
};