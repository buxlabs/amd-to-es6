"use strict";

module.exports = function (node, element, param) {

    var declaration = {
        type: "VariableDeclaration",
        declarations: [
            {
                type: "VariableDeclarator",
                id: {
                    type: "Identifier",
                    name: param
                }
            }
        ],
        kind: node.kind
    };

    if (element.init) {
        declaration.declarations[0].init = element.init;
    }

    return declaration;
}
