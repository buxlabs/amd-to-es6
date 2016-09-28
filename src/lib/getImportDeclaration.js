"use strict";

module.exports = function (element, param) {
    var specifiers = [];
    if (param) {
        specifiers.push({
            type: "ImportDefaultSpecifier",
            local: {
                type: "Identifier",
                name: param
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
