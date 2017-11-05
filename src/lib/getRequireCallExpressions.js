'use strict'

const walk = require('acorn/dist/walk')

module.exports = function (ast) {
  var nodes = []
  walk.simple(ast, {
    CallExpression: function (node) {
      if (node.callee &&
                node.callee.type === 'Identifier' &&
                node.callee.name === 'require') {
        nodes.push(node)
      }
    }
  })
  return nodes
}
