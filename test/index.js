var koa = require('koa');
var expect = require('expect.js');
var $http = require('../bin').http;
var testPort = 7511;
var testApi = {
    gmaps: new $http('https://maps.googleapis.com/')
};

var app = koa();

app.use(function *() {

    var response = yield testApi.gmaps._get('maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA');


    this.response.body =
    {
        http_get: expect(response.body).to.have.property('status').obj || false
    };
});

app.listen(testPort);


console.log('serving test report on port ' + testPort);


// todo: use supertest
//function server (app) {
//  return agent(http.createServer(app.callback()))
//}
