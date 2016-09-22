"use strict";

const acorn = require("acorn");
const walk = require("acorn/dist/walk");
const isDefineWithCallback = require("./isDefineWithCallback");

module.exports = function (source) {
    // this could be optimized easily, we could pass ast instead
    var code = acorn.parse(source);
    var hasDefineWithCallback = false;
    walk.simple(code, {
        CallExpression: function (node) {
            if (isDefineWithCallback(node)) {
                hasDefineWithCallback = true;
            }
        }
    });
    return hasDefineWithCallback;
};
