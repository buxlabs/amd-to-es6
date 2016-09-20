"use strict";

function getImportDeclaration (element, param) {
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

module.exports = function (dependencies) {
    return dependencies.map(function (dependency) {
        return getImportDeclaration(dependency.element, dependency.param);
    });
};
