var
  app = require('../../joola.io.sdk.js');

"use strict";
describe("services", function () {
  var request;
  before(function (done) {
    request = require('supertest')('http://localhost:42112',{ debug: false });
		done();
	});

	it("should return a page", function (done) {
		this.timeout = 5000;
    request.get('/').expect(200, function (err) {
      if (err)
        return done(err);
      done();
    });
	});
});