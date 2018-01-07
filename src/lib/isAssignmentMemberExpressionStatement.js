const isAssignmentMemberExpression = require('./isAssignmentMemberExpression')

module.exports = function isAssignmentMemberExpressionStatement (node) {
  return node.type === 'ExpressionStatement' && isAssignmentMemberExpression(node.expression)
}
