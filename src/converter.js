"use strict";

const Module = require("./class/Module");

module.exports = function (source, options) {
    options = options || {};

    var module = new Module(source);

    if (!module.hasDefine()) {
        return module.source;
    }

    module.convert(options);

    if (options.beautify) {
        module.beautify();
    }
    return module.source;
};
