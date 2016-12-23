"use strict";

const walk = require("acorn/dist/walk");
const isDefineWithDependencies = require("./isDefineWithDependencies");
const isDefineWithObjectExpression = require("./isDefineWithObjectExpression");

module.exports = function (ast) {
    var hasDefine = false;
    walk.simple(ast, {
        CallExpression: function (node) {
            if (isDefineWithDependencies(node) ||
                isDefineWithObjectExpression(node)) {
                hasDefine = true;
            }
        }
    });
    return hasDefine;
};
