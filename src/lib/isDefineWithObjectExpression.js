"use strict";

const isObjectExpression = require("./isObjectExpression");

module.exports = function (node) {
    return node.callee.type === "Identifier" &&
        node.callee.name === "define" &&
        node.arguments.length === 1 &&
        isObjectExpression(node.arguments[0]);
};
