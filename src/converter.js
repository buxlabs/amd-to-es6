"use strict";

const Module = require("./class/Module");

module.exports = function (source, options) {
    options = options || {};

    var module = new Module(source);

    if (!module.has('CallExpression[callee.name="define"]')) {
        return module.toSource(options);
    }

    module.convert(options);

    return module.toSource(options);
};
