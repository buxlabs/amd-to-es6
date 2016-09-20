const amdtoes6 = require("amd-to-es6");
const converter = require("./src/converter");

module.exports = function (source, options) {
    if (options.parser === "amd-to-es6") {
        return amdtoes6(source, options);
    }
    return converter(source, options);
};
