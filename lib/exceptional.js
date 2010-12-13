var HTTP = require('http');
var gzip = require('./gzip').gzip;
var fs = require('fs');

var Exceptional = {

  API_KEY: undefined,
  PROTOCOL_VERSION: 6,
  Host: "www.getexceptional.com",
  Port: 80,

  handle: function(error) {
    if (Exceptional.API_KEY == undefined) {
      throw "API_KEY must be set";
    }

    var doc = Exceptional.error_document(error);
    Exceptional.send_error(doc);
  },

  error_document: function(error) {
    return JSON.stringify({
      "application_environment": {
        "application_root_directory": process.cwd(),
        "language": "node-javascript",
        "framework": "node" + process.version,
        "env": {
          "args": process.argv,
          "execPath": process.execPath,
          "cwd": process.cwd(),
          "env": process.env,
          "gid": process.getgid(),
          "uid": process.getuid(),
          "version": process.version,
          "installPrefix": process.installPrefix,
          "pid": process.pid,
          "platform": process.platform,
          "memory": process.memoryUsage()
        }
      },

      "exception": {
        "occurred_at": new Date(),
        "message": error.message,
        "backtrace": error.stack.split("\n"),
        "exception_class": "node"
      },
      "client": {
        "name": "Exceptional for node.js",
        "version": "1.0",
        "protocol_version": 6
      }
    });
  },

  send_error: function(doc) {
    gzip(doc, 1, function(err, data) {

      var client  = HTTP.createClient(Exceptional.Port, Exceptional.Host);

      var headers = {
        'Host' : Exceptional.Host,
        'Content-Length' : data.length
      };

      var request = client.request('POST', '/api/errors?api_key=' + Exceptional.API_KEY + "&protocol_version=" + Exceptional.PROTOCOL_VERSION, headers);

      request.write(data);
      request.end();

      request.on('response', function (response) {
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
        });
      });
    });
  }
};

exports.Exceptional = Exceptional;