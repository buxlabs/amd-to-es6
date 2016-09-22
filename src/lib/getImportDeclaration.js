"use strict";

module.exports = function (element, param) {
    return {
        type: "ImportDeclaration",
        specifiers: [
            {
                type: "ImportDefaultSpecifier",
                local: {
                    type: "Identifier",
                    name: param
                }
            }
        ],
        source: {
            type: "Literal",
            value: element
        }
    };
}
