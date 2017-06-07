"use strict";

const isRequireSugarVariableDeclarator = require("./isRequireSugarVariableDeclarator");
const isReturnStatement = require("./isReturnStatement");
const isVariableDeclaration = require("./isVariableDeclaration");
const isRequireCallExpression = require("./isRequireCallExpression");
const isExportsAssignmentExpression = require("./isExportsAssignmentExpression");
const getImportDeclaration = require("./getImportDeclaration");
const getVariableDeclaration = require("./getVariableDeclaration");
const hasDefineWithCallback = require("./hasDefineWithCallback");
const getRequireCallExpressions = require("./getRequireCallExpressions");
const changeRequireCallExpressionToIdentifier = require("./changeRequireCallExpressionToIdentifier");
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

function changeExportsAssignmentExpressionToExportDeclaration (node) {

    var id = {
        type: "Identifier",
        name: node.expression.left.property.name
    };

    var declaration;
    if (node.expression.right.type === "FunctionExpression") {
        declaration = node.expression.right;
        declaration.type = "FunctionDeclaration";
        declaration.id = id;
    } else {
        declaration = {};
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

function changeNestedRequireCallExpressionToNamedImportDeclaration (node, options) {
    return getImportDeclaration(node.arguments[0].value, null, options || { side: true });
}

function isAssignmentMemberExpression (node) {
    return node.type === 'ExpressionStatement' &&
        node.expression.type === 'AssignmentExpression' &&
        node.expression.left.type === 'MemberExpression' &&
        node.expression.right.type === 'CallExpression' &&
        node.expression.right.callee.name === 'require' &&
        node.expression.right.arguments.length === 1 &&
        node.expression.right.arguments[0].type === 'Literal';
}

function changeAssignmentMemberExpressionRequire (node, name) {
    node.expression.right = { type: "Identifier", name: name };
    return node;
}

module.exports = function (ast, code, options) {
    var canHaveRequireSugar = hasDefineWithCallback(ast);
    var imports = [];
    var nodes = code.map(function (node) {
        if (canHaveRequireSugar && isVariableDeclaration(node)) {
            return changeVariableDeclaration(node, options);
        } else if (isRequireCallExpression(node)) {
            return changeRequireCallExpressionToImportDeclaration(node, options);
        } else if (isReturnStatement(node)) {
            return changeReturnToExportDefaultDeclaration(node);
        } else if (isAssignmentMemberExpression(node)) {
            var expression = changeNestedRequireCallExpressionToNamedImportDeclaration(node.expression.right, {
                side: true,
                assigned: true
            });
            imports.push(expression);
            return changeAssignmentMemberExpressionRequire(node, expression.specifiers[0].local.name);
        } else if (isExportsAssignmentExpression(node)) {
            var expressions = getRequireCallExpressions(node).map(changeNestedRequireCallExpressionToNamedImportDeclaration);
            if (expressions.length > 0) {
                imports = imports.concat(expressions);
                node = changeRequireCallExpressionToIdentifier(node);
            }
            return changeExportsAssignmentExpressionToExportDeclaration(node);
        }
        return node;
    });

    return imports.concat(flatten(nodes));
};
