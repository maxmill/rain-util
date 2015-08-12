//
//var agent = require('supertest').agent
//var http = require('http');
//var koa = require('koa');
//var $http = require('../bin').http;
//
//module.exports = server;
//
//
//function server (app) {
//  return agent(http.createServer(app.callback()))
//}
//
//
//var app = koa();
//
//app.use(function *() {
//
//    var response = yield new $http('https://maps.googleapis.com/')._get('maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA');
//
//
//    this.response.body = {
//        http_get: expect(response.body).to.have.property('status').obj || false
//    };
//});
//
//app.listen(7111);
//
//module.exports = app;
