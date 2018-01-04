'use strict'

const { walk } = require('@buxlabs/ast')

module.exports = function (ast) {
  var nodes = []
  walk(ast, function (node) {
    if (node.type === 'CallExpression' &&
      node.callee &&
      node.callee.type === 'Identifier' &&
      node.callee.name === 'require'
    ) {
      nodes.push(node)
    }
  })
  return nodes
}
