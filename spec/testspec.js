const { error } = require("console");
const { response } = require("express");
var request = require("request");

var base_url = "http://localhost:3000/"

describe("SWE Project", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("blank page loads", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(body).toBeUndefined();
        done();
      });
    });

    it("check response", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response).toBeUndefined();
        done();
      });
    });



  });
});
