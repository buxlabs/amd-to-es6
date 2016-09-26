"use strict";

const isUseStrict = require("./isUseStrict");
const isRequireSugarVariableDeclarator = require("./isRequireSugarVariableDeclarator");
const isReturnStatement = require("./isReturnStatement");
const isVariableDeclaration = require("./isVariableDeclaration");
const getImportDeclaration = require("./getImportDeclaration");
const getVariableDeclaration = require("./getVariableDeclaration");
const hasDefineWithCallback = require("./hasDefineWithCallback");
const flatten = require("./util/flatten");

function changeReturnToExportDefaultDeclaration (node) {
    node.type = "ExportDefaultDeclaration";
    node.declaration = node.argument;
    delete node.argument;
    return node;
}

function changeVariableDeclaration (node) {
    return node.declarations.map(function (declarator) {
        var param = declarator.id.name;
        if (isRequireSugarVariableDeclarator(declarator)) {            
            var element = declarator.init && declarator.init.arguments && declarator.init.arguments[0].value;
            return getImportDeclaration(element, param);
        }
        return getVariableDeclaration(declarator, param);
    });
}

module.exports = function (source, code) {
    var canHaveRequireSugar = hasDefineWithCallback(source);
    var array = code.filter(function (node) {
        return !isUseStrict(node);
    }).map(function (node) {
        if (canHaveRequireSugar && isVariableDeclaration(node)) {
            return changeVariableDeclaration(node);
        }
        if (isReturnStatement(node)) {
            return changeReturnToExportDefaultDeclaration(node);
        }
        return node;
    });

    return flatten(array);
};
