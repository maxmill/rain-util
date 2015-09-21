const _request = require('request');
const fs = require('fs');

var download = (uri, filename, callback) => _request.head(uri, (err, res, body) => {
    if (err) {
        callback(err, filename);
    } else {
        var stream = _request(uri);
        stream
            .pipe(fs
                .createWriteStream(filename)
                .on('error', (error)  => {
                    callback(error, filename);
                    stream.read();
                }))
            .on('close', ()=> callback(null, filename));
    }
});


var handle = (file) => {
    if (file.src && file.url) {
        download(file.url, file.src, (error, filename) => {
            return error ? filename + ':\n\t' + error.message : true;
        });
    } else {
        return 'file missing name/url';
    }
};

module.exports = (options) => {
    if (options && typeof options === 'object') {
        return Array.isArray(options) ? options.map(handle) : handle(options);
    } else {
        console.error('invalid type -  use object or array ');
    }
};