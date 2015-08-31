const _http = require('./http');
const _fs = require('./fs');
const download = require('./download');
var _postgres = require('./postgres');

// expose as one util
module.exports =
{
    http: _http,
    fs: _fs,
    postgres:_postgres,
    download:download
};