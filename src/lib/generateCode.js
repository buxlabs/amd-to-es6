"use strict";

const isUseStrict = require("./isUseStrict");
const isRequireSugarDeclaration = require("./isRequireSugarDeclaration");
const isReturnStatement = require("./isReturnStatement");
const isVariableDeclaration = require("./isVariableDeclaration");
const getImportDeclaration = require("./getImportDeclaration");
const hasDefineWithCallback = require("./hasDefineWithCallback");
const flatten = require("./util/flatten");

function changeReturnToExportDefaultDeclaration (node) {
    node.type = "ExportDefaultDeclaration";
    node.declaration = node.argument;
    delete node.argument;
    return node;
}

function changeRequireSugarIntoImportDeclaration (node) {
    return node.declarations.filter(function (declarator) {
        return isRequireSugarDeclaration(declarator);
    }).map(function (declarator) {
        var element = declarator.init.arguments[0].value;
        var param = declarator.id.name;
        return getImportDeclaration(element, param);
    });
}

module.exports = function (source, code) {
    var canHaveRequireSugar = hasDefineWithCallback(source);
    var array = code.filter(function (node) {
        return !isUseStrict(node);
    }).map(function (node) {
        if (canHaveRequireSugar && isVariableDeclaration(node)) {
            return changeRequireSugarIntoImportDeclaration(node);
        }
        if (isReturnStatement(node)) {
            return changeReturnToExportDefaultDeclaration(node);
        }
        return node;
    });

    return flatten(array);
};
