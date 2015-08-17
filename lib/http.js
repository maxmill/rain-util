const Immutable = require('immutable');
const _request = require('request');

// wrap request library as thunk-returning functions for koa use
function request(uri, options) {
    return (callback) => {
        _request(uri, options, (error, response, body)  => {
            callback(error, response);
        })
    }
}
// copy request lib's properties
Object.keys(_request).forEach((attr)=> {
    request[attr] = (['get', 'post', 'put', 'patch', 'head', 'del'].indexOf(attr) > -1)
        ?
        ((attr) => {
            return (uri, options)=> {
                return (callback) => {
                    _request[attr](uri, options, (error, response, body) => {
                        callback(error, response);
                    });
                };
            };
        })(attr)
        :
        _request[attr];
});

module.exports = (url, headers) => {
  // merge headers and set default behaviors for every requests
    var common_headers = Immutable.Map(headers || {});
    var call = (method, path, body, headers) => {
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

// expose koa compatible request.js wrapper
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
