'use strict'

const AbstractSyntaxTree = require('@buxlabs/ast')
const isDefineWithObjectExpression = require('../lib/isDefineWithObjectExpression')
const isDefineWithDependencies = require('../lib/isDefineWithDependencies')
const getDefineCallbackArguments = require('../lib/getDefineCallbackArguments')
const isNamedDefine = require('../lib/isNamedDefine')
const isReturnStatement = require('../lib/isReturnStatement')
const isVariableDeclaration = require('../lib/isVariableDeclaration')
const isRequireCallExpression = require('../lib/isRequireCallExpression')
const isExportsAssignmentExpressionStatement = require('../lib/isExportsAssignmentExpressionStatement')
const changeReturnToExportDefaultDeclaration = require('../lib/changeReturnToExportDefaultDeclaration')
const changeExportsAssignmentExpressionToExportDeclaration = require('../lib/changeExportsAssignmentExpressionToExportDeclaration')
const Harvester = require('./Harvester')

class Module extends AbstractSyntaxTree {
  convert (options) {
    const define = this.first('CallExpression[callee.name=define]')
    if (isDefineWithObjectExpression(define)) {
      this.ast.body = [{
        type: 'ExportDefaultDeclaration',
        declaration: define.arguments[0]
      }]
    } else {
      const harvester = new Harvester(this.ast)
      const imports = harvester.harvest()
      const body = this.getBody(define)
      const code = this.transform(body, options)
      this.ast.body = imports.concat(code)
      this.clean()
    }
  }

  getBody (node) {
    var body = []
    if (node.type === 'CallExpression' && (isDefineWithDependencies(node) || isNamedDefine(node))) {
      let args = getDefineCallbackArguments(node)
      if (args.body.type === 'BlockStatement') {
        body = args.body.body
      } else {
        body = [{ type: 'ExportDefaultDeclaration', declaration: args.body }]
      }
    }
    return body
  }

  transform (body, options) {
    return body.map(node => {
      if (isReturnStatement(node)) {
        return changeReturnToExportDefaultDeclaration(node)
      } else if (isRequireCallExpression(node)) {
        return null
      } else if (isVariableDeclaration(node)) {
        node.declarations = node.declarations.filter(declaration => {
          if (declaration.init &&
            declaration.init.type === 'CallExpression' &&
            declaration.init.callee.name === 'require') {
            return false
          }
          return true
        })
        return node
      } else if (isExportsAssignmentExpressionStatement(node)) {
        return changeExportsAssignmentExpressionToExportDeclaration(node)
      }
      return node
    }).filter(Boolean)
  }

  clean () {
    this.removeEsModuleConvention()
    this.removeUseStrict()
  }

  removeEsModuleConvention () {
    var object = '[expression.callee.object.name=Object]'
    var property = '[expression.callee.property.name=defineProperty]'
    var selector = `ExpressionStatement${object}${property}`
    var nodes = this.find(selector)
    nodes.forEach(node => {
      var args = node.expression.arguments
      if (args.length > 2 &&
        args[0].type === 'Identifier' && args[0].name === 'exports' &&
        args[1].type === 'Literal' && args[1].value === '__esModule'
      ) {
        this.remove(node)
      }
    })
  }

  removeUseStrict () {
    this.remove({
      type: 'ExpressionStatement',
      expression: {
        type: 'Literal',
        value: 'use strict'
      }
    })
  }
}

module.exports = Module
