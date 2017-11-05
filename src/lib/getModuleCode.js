'use strict'

const walk = require('acorn/dist/walk')
const isDefineWithDependencies = require('./isDefineWithDependencies')
const getDefineCallbackArguments = require('./getDefineCallbackArguments')
const isNamedDefine = require('./isNamedDefine')

module.exports = function (ast) {
  var body = []
  walk.simple(ast, {
    CallExpression: function (node) {
      if (isDefineWithDependencies(node) || isNamedDefine(node)) {
        let define = getDefineCallbackArguments(node)
        if (define.body.type === 'BlockStatement') {
          body = define.body.body
        } else {
          body = [{ type: 'ReturnStatement', argument: define.body }]
        }
      }
    }
  })
  return body
}
