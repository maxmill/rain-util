const _http = require('./http');
const _fs = require('./fs');
const _download = require('./download');
const _postgres = require('./postgres');

// expose as one util
module.exports =
{
    http: _http,
    fs: _fs,
    download: _download,
    postgres:_postgres
};