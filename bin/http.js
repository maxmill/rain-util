'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _request = require('request');

// wrap request library as thunk-returning functions for co/koa use
function request(uri, options) {
    return function (callback) {
        _request(uri, options, function (error, response, body) {
            callback(error, response);
        });
    };
}
// copy request lib's properties
Object.keys(_request).forEach(function (attr) {
    request[attr] = ['get', 'post', 'put', 'patch', 'head', 'del'].indexOf(attr) > -1 ? (function (attr) {
        return function (uri, options) {
            return function (callback) {
                _request[attr](uri, options, function (error, response, body) {
                    callback(error, response);
                });
            };
        };
    })(attr) : _request[attr];
});
/**
 *
 * @param url: base api url
 * @param headers: convenience param for common headers
 * @param opts: other request.js properties go here (httpSignature, multipart, headers)
 * */

module.exports = function () {
    for (var _len = arguments.length, opts = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        opts[_key - 2] = arguments[_key];
    }

    var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var headers = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var options = _extends({}, opts);

    options.headers = Object.assign(headers, options.headers || {});
    var apiRequest = request.defaults(options);
    var call = function call(method, path, body) {
        var requestHeaders = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

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
        get: function get(url, headers) {
            return call('GET', url, headers);
        },

        del: function del(url, headers) {
            return call('DELETE', url, headers);
        },

        post: function post(url, body, headers) {
            return call('POST', url, body, headers);
        },

        patch: function patch(url, body, headers) {
            return call('PATCH', url, body, headers);
        },

        put: function put(url, body, headers) {
            return call('PUT', url, body, headers);
        },

        options: function options(url, body, headers) {
            return call('OPTIONS', url, body, headers);
        },

        head: function head(url, headers) {
            return call('HEAD', url, headers);
        }
    };
};