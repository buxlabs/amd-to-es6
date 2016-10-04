define("alpha", ["require", "exports"], function (require, exports) {
    exports.verb = function() {
        var hello = function () {
            return {
                world: function () {}
            }
        };
        hello().world();
        return require("beta").verb();
    }
});
