"use strict";

const acorn = require("acorn");
const walk = require("acorn/dist/walk");
const isDefineWithDependencies = require("./isDefineWithDependencies");
const getDefineCallbackArguments = require("./getDefineCallbackArguments");

module.exports = function (source) {
    var ast = acorn.parse(source);
    var body = [];
    walk.simple(ast, {
        CallExpression: function (node) {
            if (isDefineWithDependencies(node)) {
                body = getDefineCallbackArguments(node).body.body;
            }
        }
    });
    return body;
};
