"use strict";

module.exports = function (node) {
    return node.callee.type === "Identifier" && 
        node.callee.name === "define" &&
        node.arguments.length === 1 &&
        node.arguments[0].type === "FunctionExpression";
};
