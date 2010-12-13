var utils = require('utils');

TEST = {
   passed: 0,
   failed: 0,
   assertions: 0,

   test: function (desc, block) {
      var _puts  = utils.puts,
          output = "",
          result = '?',
          _boom = null;
      utils.puts = function (s) { output += s + "\n"; }
      try {
         utils.print("  " + desc + " ...");
         block();
         result = '.';
      } catch(boom) {
         if ( boom == 'FAIL' ) {
            result = 'F';
         } else {
            result = 'E';
            _boom = boom;
            utils.puts(boom.toString());
         }
      }
      utils.puts = _puts;
      if ( result == '.' ) {
         utils.print(" OK\n");
         TEST.passed += 1;
      } else {
         utils.print(" FAIL\n");
         utils.print(output.replace(/^/, "      ") + "\n");
         TEST.failed += 1;
         if ( _boom ) throw _boom;
      }
   },

   assert: function (value, desc) {
      TEST.assertions += 1;
      if ( desc ) utils.puts("ASSERT: " + desc);
      if ( !value ) throw 'FAIL';
   },

   assert_equal: function (expect, is) {
      assert(
         expect == is,
         utils.inspect(expect) + " == " + utils.inspect(is)
      );
   },

   assert_boom: function (message, block) {
      var error = null;
      try { block() }
      catch (boom) { error = boom }

      if ( !error ) {
         utils.puts('NO BOOM');
         throw 'FAIL'
      }
      if ( error != message ) {
         utils.puts('BOOM: ' + utils.inspect(error) +
                  ' [' + utils.inspect(message) + ' expected]');
         throw 'FAIL'
      }
   }
};

process.on('exit', function (code) {
   if ( !TEST.exit ) {
      TEST.exit = true;
      utils.puts("" + TEST.passed + " passed, " + TEST.failed + " failed");
      if ( TEST.failed > 0 ) { process.exit(1) };
   }
});


for(var key in TEST) GLOBAL[key] = TEST[key];