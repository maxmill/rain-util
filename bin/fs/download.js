'use strict';

var _request = require('request');
var fs = require('fs');

var download = function download(uri, filename, callback) {
    return _request.head(uri, function (err, res, body) {
        if (err) {
            callback(err, filename);
        } else {
            var stream = _request(uri);
            stream.pipe(fs.createWriteStream(filename).on('error', function (error) {
                callback(error, filename);
                stream.read();
            })).on('close', function () {
                return callback(null, filename);
            });
        }
    });
};

var handle = function handle(file) {
    if (file.src && file.url) {
        download(file.url, file.src, function (error, filename) {
            return error ? filename + ':\n\t' + error.message : true;
        });
    } else {
        return 'file missing name/url';
    }
};

module.exports = function (options) {
    if (options && typeof options === 'object') {
        return Array.isArray(options) ? options.map(handle) : handle(options);
    } else {
        console.error('invalid type -  use object or array ');
    }
};