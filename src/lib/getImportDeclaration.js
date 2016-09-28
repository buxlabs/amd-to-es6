"use strict";

const string = require("underscore.string");

module.exports = function (element, param) {
    return {
        type: "ImportDeclaration",
        specifiers: [
            {
                type: "ImportDefaultSpecifier",
                local: {
                    type: "Identifier",
                    name: param || string.camelize(element.replace(".", "-"))
                }
            }
        ],
        source: {
            type: "Literal",
            value: element
        }
    };
}
