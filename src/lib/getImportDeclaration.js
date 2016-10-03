"use strict";

const string = require("underscore.string");
var count = 0;

function getIdentifierName (element, param, options) {
    if (param) { return param; }
    if (options.assigned) { 
        count += 1;
        return "$SIDE_EFFECT_" + count; 
    }
    return string.camelize(element.replace(".", "-"));
}

module.exports = function (element, param, options) {
    var specifiers = [];
    if (param || options.side) {
        specifiers.push({
            type: "ImportDefaultSpecifier",
            local: {
                type: "Identifier",
                name: getIdentifierName(element, param, options)
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
