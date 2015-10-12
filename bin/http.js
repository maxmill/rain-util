'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _request = require('request');
var _methods = ['get', 'post', 'put', 'patch', 'head', 'del'];

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
    request[attr] = _methods.indexOf(attr) > -1 ? (function (attr) {
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

    var out = {};
    _methods.forEach(function (m) {
        if (m.charAt(0) !== 'p') {
            (function () {
                var httpMethod = m === 'del' ? 'DELETE' : m.toUpperCase();
                Object.defineProperty(out, m, function (url, headers) {
                    return call(httpMethod, url, headers);
                });
            })();
        } else {
            Object.defineProperty(out, m, function (url, body, headers) {
                return call(m.toUpperCase(), url, body, headers);
            });
        }
    });
    return out;
};