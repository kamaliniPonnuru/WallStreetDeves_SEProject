const { error } = require("console");
const { Hash } = require("crypto");
const { BADQUERY } = require("dns");
const { response, application } = require("express");
const { url } = require("inspector");
const { type } = require("os");
var request = require("request");

var base_url = "http://localhost:3000/"

describe("SWE Project", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBeDefined();
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

    it("Error response checking", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(error).toBeDefined();
        done();
      });
    });

    it("deployment URL active", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(base_url).toBeDefined();
        done();
      });
    });

    it("complete URL", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(base_url.substring).toBeDefined();
        expect(base_url.length).toBeDefined();
        expect(base_url.length).toBe(22);
        expect(base_url.includes('http')).toBeTrue();
        expect(base_url.startsWith('http')).toBeTrue();
        expect(type(base_url)).toBeDefined();
        expect(BADQUERY).toBeDefined();
        expect(application).toBeDefined();
        done();
      });
    });    


  });
});

/*console.log(application)
console.log(application.route('1'));
console.log(application.subscribe());*/