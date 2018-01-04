'use strict'

const { walk } = require('@buxlabs/ast')
const getIdentifierName = require('./getIdentifierName')

module.exports = function (ast) {
  walk(ast, function (node) {
    if (node.type === 'MemberExpression' &&
      node.object.type === 'CallExpression' &&
      node.object.callee &&
      node.object.callee.type === 'Identifier' &&
      node.object.callee.name === 'require'
    ) {
      var name = getIdentifierName(node.object.arguments[0].value)
      node.object = {
        type: 'Identifier',
        name: name
      }
    }
  })
  return ast
}
