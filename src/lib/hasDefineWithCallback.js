'use strict'

const walk = require('acorn/dist/walk')
const isDefineWithFunctionExpression = require('./isDefineWithFunctionExpression')

module.exports = function (ast) {
  var has = false
  walk.simple(ast, {
    CallExpression: function (node) {
      if (isDefineWithFunctionExpression(node)) {
        has = true
      }
    }
  })
  return has
}
