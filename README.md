Exceptional for node.js


process.addListener('uncaughtException', function(err) {
  Exceptional.handle(err);
});
