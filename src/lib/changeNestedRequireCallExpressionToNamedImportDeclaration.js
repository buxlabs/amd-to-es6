const getImportDeclaration = require('./getImportDeclaration')

module.exports = function changeNestedRequireCallExpressionToNamedImportDeclaration (node, options) {
  return getImportDeclaration(node.arguments[0].value, null, options || { side: true })
}
