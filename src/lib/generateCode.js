"use strict";

const isUseStrict = require("./isUseStrict");
const isObjectExpression = require("./isObjectExpression");
const isRequireSugarVariableDeclarator = require("./isRequireSugarVariableDeclarator");
const isReturnStatement = require("./isReturnStatement");
const isVariableDeclaration = require("./isVariableDeclaration");
const isRequireCallExpression = require("./isRequireCallExpression");
const isExportsAssignmentExpression = require("./isExportsAssignmentExpression");
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

function changeVariableDeclaration (node, options) {
    return node.declarations.map(function (declarator) {
        var param = declarator.id.name;
        if (isRequireSugarVariableDeclarator(declarator)) {
            var element = declarator.init && declarator.init.arguments && declarator.init.arguments[0].value;
            return getImportDeclaration(element, param, options);
        }
        return getVariableDeclaration(node, declarator, param);
    });
}

function changeObjectExpressionToExportDefaultDeclaration (node) {
    return {
        type: "ExportDefaultDeclaration",
        declaration: node
    };
}

function changeExportsAssignmentExpressionToExportDeclaration (node) {

    var id = {
        type: "Identifier",
        name: node.expression.left.property.name
    };

    var declaration;
    if (node.expression.right.type === "FunctionExpression") {
        declaration = node.expression.right;
        declaration.type = "FunctionDeclaration";
        declaration.id = id
    } else {
        var declaration = {};
        declaration.type = "VariableDeclaration";
        declaration.kind = "var";
        declaration.declarations = [
            {
                type: "VariableDeclarator",
                id: id,
                init: node.expression.right
            }
        ];
    }

    return {
        type: "ExportNamedDeclaration",
        declaration: declaration
    };
}

function changeRequireCallExpressionToImportDeclaration (node, options) {
    return getImportDeclaration(node.expression.arguments[0].value, null, options);
}

module.exports = function (source, code, options) {
    var canHaveRequireSugar = hasDefineWithCallback(source);
    var array = code.filter(function (node) {
        return !isUseStrict(node);
    }).map(function (node) {
        if (canHaveRequireSugar && isVariableDeclaration(node)) {
            return changeVariableDeclaration(node, options);
        } else if (isRequireCallExpression(node)) {
            return changeRequireCallExpressionToImportDeclaration(node, options);
        } else if (isReturnStatement(node)) {
            return changeReturnToExportDefaultDeclaration(node);
        } else if (isObjectExpression(node)) {
            return changeObjectExpressionToExportDefaultDeclaration(node);
        } else if (isExportsAssignmentExpression(node)) {
            return changeExportsAssignmentExpressionToExportDeclaration(node);
        }
        return node;
    });

    return flatten(array);
};
