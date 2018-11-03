define("alpha", ["require", "exports"], function (require, exports) {
  exports.verb = function() {
    return require("beta").verb();
  }
});
