"use strict";

const walk = require("acorn/dist/walk");
const isDefineWithDependencies = require("./isDefineWithDependencies");
const isDefineWithObjectExpression = require("./isDefineWithObjectExpression");
const getDefineCallbackArguments = require("./getDefineCallbackArguments");

module.exports = function (ast) {
    var body = [];
    walk.simple(ast, {
        CallExpression: function (node) {
            if (isDefineWithDependencies(node)) {
                let define = getDefineCallbackArguments(node);
                body = define.body.body || [{ type: 'ReturnStatement', argument: define.body }];
            } else if (isDefineWithObjectExpression(node)) {
                body = [getDefineCallbackArguments(node)];
            }
        }
    });
    return body;
};
