const _request = require('request');

// wrap request library as thunk-returning functions for co/koa use
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
        ((attr) => (uri, options)=> (callback) => {
            _request[attr](uri, options, (error, response, body) => {
                callback(error, response);
            });
        })(attr)
        :
        _request[attr];
});
/**
 *
 * @param url: base api url
 * @param headers: convenience param for common headers
 * @param opts: other request.js properties go here (httpSignature, multipart, headers)
 * */

module.exports = (url = '', headers = {}, ...opts) => {
    var options = {...opts};

    options.headers = Object.assign(headers, options.headers || {});
    var apiRequest = request.defaults(options);
    var call = (method, path, body, requestHeaders = {}) => {
        var requestOptions = {
            url: url + path,
            headers: requestHeaders,
            method: method || 'GET',
            json: true
        };
        if (body) {
            requestOptions.body = body;
        }
        return apiRequest(requestOptions);
    };

// expose api interface
    return {
        get: (url, headers) => call('GET', url, headers),

        del: (url, headers) => call('DELETE', url, headers),

        post: (url, body, headers) => call('POST', url, body, headers),

        patch: (url, body, headers) => call('PATCH', url, body, headers),

        put: (url, body, headers) => call('PUT', url, body, headers),

        options: (url, body, headers) => call('OPTIONS', url, body, headers),

        head: (url, headers) => call('HEAD', url, headers)
    };
};
