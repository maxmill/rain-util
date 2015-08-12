const request = require('koa-request');
const Immutable = require('immutable');

module.exports = (url, headers) => {
    var
        common_headers = Immutable.Map(headers || {}),
        call = (method, path, body, headers) => {
            var options = {
                url: url + path,
                headers: common_headers.merge(headers || {}),
                method: method || 'GET',
                json: true
            };
            if (body) {
                options.body = body;
            }
            return request(options);
        };

    return {
        _get: (url, headers) => call('GET', url, headers),

        _delete: (url, headers) => call('DELETE', url, headers),

        _post: (url, body, headers) => call('POST', url, body, headers),

        _patch: (url, body, headers) => call('PATCH', url, body, headers),

        _put: (url, body, headers) => call('PUT', url, body, headers),

        _options: (url, body, headers) => call('OPTIONS', url, body, headers),

        _head: (url, headers) => call('HEAD', url, headers)
    };
};
