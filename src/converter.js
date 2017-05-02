"use strict";

const Module = require("./class/Module");

module.exports = function (source, options) {
    options = options || {};

    if (source.indexOf('define') === -1) { return source; }

    var module = new Module(source);

    if (module.has('CallExpression[callee.name="define"]')) {
        module.convert(options);
    }

    return module.toSource(options);
};
