require('./test');

var Exceptional = require('../lib/exceptional').Exceptional;

test('test set API key', function() {
  assert_equal(Exceptional.API_KEY, undefined);
  Exceptional.API_KEY = "test-api-key";
  assert_equal(Exceptional.API_KEY, "test-api-key");
});

test('Exceptional.handle requires API_KEY to be set', function() {
  Exceptional.API_KEY = undefined;
  assert_boom("API_KEY must be set", function() {
    Exceptional.handle("error");
  });

test('creates JSON document', function() {
  Exceptional.API_KEY = 'test-api-key';
  try {
    throw new Error("Big Problem");
  } catch(error) {
    var doc = Exceptional.error_document(error);
    console.log(doc);
  }
  });
});