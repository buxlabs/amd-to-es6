"use strict";

const string = require("underscore.string");

module.exports = function (element, param, options) {
    var specifiers = [];
    if (param || options.side) {
        specifiers.push({
            type: "ImportDefaultSpecifier",
            local: {
                type: "Identifier",
                name: param || string.camelize(element.replace(".", "-"))
            }
        });
    }

    return {
        type: "ImportDeclaration",
        specifiers: specifiers,
        source: {
            type: "Literal",
            value: element
        }
    };
}
