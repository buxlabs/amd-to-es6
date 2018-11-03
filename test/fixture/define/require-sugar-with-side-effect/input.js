define(function (require) {
  var hello = require("hello");
  require("bootstrap");
  return hello.world();
});
