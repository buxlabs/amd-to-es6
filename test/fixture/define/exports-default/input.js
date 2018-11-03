define("foo", ["exports", "bar", "baz"], function (exports, bar, baz) {
  exports.default = bar(baz)
})
