const _http = require('./http');
const _fs = require('./fs');
const _postgres = require('./postgres');
const genify = require('thunkify-wrap').genify; // converts normal functions into generator functions


//TODO: change pg
// expose as one util
module.exports =
{
    http: _http,
    fs: _fs,
    postgres:_postgres,
    genify:genify
};