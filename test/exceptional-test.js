var Wick = require('./wickit').Wick;
var Exceptional = require('../lib/exceptional').Exceptional;
var assert = require('assert');

Wick.it('test set API key', function() {
  assert.equal(Exceptional.API_KEY, undefined);
  Exceptional.API_KEY = "test-api-key";
  assert.equal(Exceptional.API_KEY, "test-api-key");
});

Wick.it('Exceptional.handle requires API_KEY to be set', function() {
  Exceptional.API_KEY = undefined;
  assert.throws(function() {
    Exceptional.handle("error");
  }, "API_KEY must be set");

Wick.it('creates JSON document', function() {
  Exceptional.API_KEY = 'test-api-key';
  try {
    throw new Error("Big Problem");
  } catch(error) {
    var doc = Exceptional.error_json(error);
  }
  });
});