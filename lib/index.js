const _http = require('./http');
const _fs = require('./fs');
const _download = require('./download');
const _postgres = require('./postgres');

module.exports =
{
    http: _http,
    fs: _fs,
    download: _download,
    postgres:_postgres
};