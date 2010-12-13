// http://github.com/wal/wickit

var utils = require('utils');
var path = require('path');

Wick = {
  passed: 0,
  failed: 0,
  current_context: undefined,

  context: function(name, block) {
    utils.puts("");
    utils.puts(path.basename(process.argv[1]));
    utils.puts("-");
    Wick.current_context = name;
    block();
    Wick.current_context = undefined;
  },

  it: function(name, block){
    if (Wick.current_context) {
      utils.print(Wick.current_context + " - ");
    }

    utils.print(" [ " + name + " ] \t");

    try {
      block();
      utils.puts("PASS");
      Wick.passed += 1;
    } catch(error) {
      utils.puts("FAIL " + error.stack);
      Wick.failed += 1;
    }
  }
};

exports.Wick = Wick;

process.on('exit', function (code) {
  utils.puts("\n-------\n");
  utils.puts("" + Wick.passed + " passed, " + Wick.failed + " failed");
  utils.puts("\n\n");
});

