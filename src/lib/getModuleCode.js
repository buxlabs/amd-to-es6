"use strict";

const acorn = require("acorn");
const walk = require("acorn/dist/walk");
const isDefineWithDependencies = require("./isDefineWithDependencies");
const isDefineWithObjectExpression = require("./isDefineWithObjectExpression");
const getDefineCallbackArguments = require("./getDefineCallbackArguments");

module.exports = function (ast) {
    var body = [];
    walk.simple(ast, {
        CallExpression: function (node) {
            if (isDefineWithDependencies(node)) {
                body = getDefineCallbackArguments(node).body.body;
            } else if (isDefineWithObjectExpression(node)) {
                body = [getDefineCallbackArguments(node)];
            }
        }
    });
    return body;
};
