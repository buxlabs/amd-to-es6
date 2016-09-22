"use strict";

const acorn = require("acorn");
const walk = require("acorn/dist/walk");
const isDefineWithArrayAndCallback = require("./isDefineWithArrayAndCallback");

function getDependencies (dependencies, node) {
    var elements = node.arguments[0].elements.map(function (element) {
        return element.value;
    });
    var params = node.arguments[1].params.map(function (param) {
        return param.name;
    });
    elements.forEach(function (element, index) {
        dependencies.push({
            element: element,
            param: params[index]
        });
    });
}

function onCallExpression (dependencies, node) {
    if (isDefineWithArrayAndCallback(node)) {
        getDependencies(dependencies, node);
    }
}

module.exports = function (source) {
    var ast = acorn.parse(source);
    var dependencies = [];
    walk.simple(ast, {
        CallExpression: onCallExpression.bind(this, dependencies)
    });
    return dependencies;
};
