"use strict";

module.exports = function (node) {
    return node.callee.type === "Identifier" && 
        node.callee.name === "define" &&
        node.arguments.length === 2 &&
        node.arguments[0].type === "ArrayExpression" &&
        node.arguments[1].type === "FunctionExpression";
};
