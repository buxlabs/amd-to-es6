'use strict'

const walk = require('acorn/dist/walk')
const getIdentifierName = require('./getIdentifierName')

module.exports = function (ast) {
  walk.simple(ast, {
    MemberExpression: function (node) {
      if (node.object.type === 'CallExpression' &&
                node.object.callee &&
                node.object.callee.type === 'Identifier' &&
                node.object.callee.name === 'require') {
        var name = getIdentifierName(node.object.arguments[0].value)
        node.object = {
          type: 'Identifier',
          name: name
        }
      }
    }
  })
  return ast
}
