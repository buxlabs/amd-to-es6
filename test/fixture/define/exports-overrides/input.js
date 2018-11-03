define("foo", ["exports", "hello", "world"], function (exports, hello, world) {
  exports.bar = exports.baz = undefined
  exports.bar = hello
  exports.baz = world
})
