const getImportDeclaration = require('./getImportDeclaration')

module.exports = function changeRequireCallExpressionToImportDeclaration (node, options) {
  return getImportDeclaration(node.expression.arguments[0].value, null, options)
}
