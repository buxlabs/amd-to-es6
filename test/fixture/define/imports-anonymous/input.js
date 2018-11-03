define("foo", ["exports", "hello", "world"], function (exports, hello) {
  exports.bar = hello("world")
})
