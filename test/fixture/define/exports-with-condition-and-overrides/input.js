define(['exports'], function (exports) {
  var foo
  if (true) {
    exports.foo = foo = 1
  }
  exports.foo = foo
})
