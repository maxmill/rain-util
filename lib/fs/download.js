const _request = require('request');
const fs = require('fs');
const genify = require('thunkify-wrap').genify;

var _download = (uri, filename, callback) => _request.head(uri, (err, res, body) => {
    if (err) {
        callback(err, filename);
    } else {
        var stream = _request(uri);
        stream
            .pipe(fs
                .createWriteStream(filename)
                .on('error', (error) => {
                    callback(error, filename);
                    stream.read();
                }))
            .on('close', ()=> callback(null, filename))
            .on('finish', () => callback(null, filename));
    }
});


var download = (options, callback) => {
    var handle = (file) => {
        if (file.src && file.url) {
            var cb = typeof callback === 'function' ? callback : (error, filename) => {
                return error ? filename + ':\n\t' + error.message : true;
            };
            _download(file.url, file.src, cb);
        } else {
            return 'file missing name/url';
        }
    };

    if (options && typeof options === 'object') {
        return Array.isArray(options) ? options.map(handle) : handle(options);
    } else {
        console.error('invalid type -  use object or array ');
    }
};

module.exports = genify(download);