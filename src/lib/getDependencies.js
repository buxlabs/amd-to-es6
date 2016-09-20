const acorn = require("acorn");
const walk = require("acorn/dist/walk");

function isDefineWithDependencies (node) {
    return node.callee.type === "Identifier" && 
        node.callee.name === "define" &&
        node.arguments[0].type === "ArrayExpression" &&
        node.arguments[1].type === "FunctionExpression";
}

function onCallExpression (dependencies, node) {
    if (isDefineWithDependencies(node)) {
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
}

module.exports = function (source) {
    var ast = acorn.parse(source);
    var dependencies = [];
    walk.simple(ast, {
        CallExpression: onCallExpression.bind(this, dependencies)
    });
    return dependencies;
};
