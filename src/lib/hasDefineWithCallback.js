"use strict";

const walk = require("acorn/dist/walk");
const isDefineWithCallback = require("./isDefineWithCallback");

module.exports = function (ast) {
    var has = false;
    walk.simple(ast, {
        CallExpression: function (node) {
            if (isDefineWithCallback(node)) {
                has = true;
            }
        }
    });
    return has;
};
