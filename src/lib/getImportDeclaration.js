"use strict";

const string = require("underscore.string");

module.exports = function (element, param) {
    var specifiers = [];
    if (param) {
        specifiers.push({
            type: "ImportDefaultSpecifier",
            local: {
                type: "Identifier",
                name: param
                // name: param || string.camelize(element.replace(".", "-"))
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
