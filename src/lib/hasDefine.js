"use strict";

const acorn = require("acorn");
const walk = require("acorn/dist/walk");
const isDefineWithDependencies = require("./isDefineWithDependencies");
const isDefineWithObjectExpression = require("./isDefineWithObjectExpression");

module.exports = function (source) {
    // this could be optimized easily, we could pass ast instead
    var code = acorn.parse(source);
    var hasDefine = false;
    walk.simple(code, {
        CallExpression: function (node) {
            if (isDefineWithDependencies(node) ||
                isDefineWithObjectExpression(node)) {
                hasDefine = true;
            }
        }
    });
    return hasDefine;
};
