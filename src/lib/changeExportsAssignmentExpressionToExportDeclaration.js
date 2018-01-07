const isExportsAssignmentExpression = require('../lib/isExportsAssignmentExpression')

module.exports = function changeExportsAssignmentExpressionToExportDeclaration (node) {
  if (isExportsAssignmentExpression(node.expression.right)) {
    return null
  }
  var name = node.expression.left.property.name
  if (name === 'default') {
    return {
      type: 'ExportDefaultDeclaration',
      declaration: node.expression.right
    }
  }
  var id = {
    type: 'Identifier',
    name: name
  }
  var declaration
  if (node.expression.right.type === 'FunctionExpression') {
    declaration = node.expression.right
    declaration.type = 'FunctionDeclaration'
    declaration.id = id
  } else {
    declaration = {}
    declaration.type = 'VariableDeclaration'
    declaration.kind = 'var'
    declaration.declarations = [
      {
        type: 'VariableDeclarator',
        id: id,
        init: node.expression.right
      }
    ]
  }

  return {
    type: 'ExportNamedDeclaration',
    declaration: declaration
  }
}
