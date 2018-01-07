'use strict'

const AbstractSyntaxTree = require('@buxlabs/ast')
const isDefineWithObjectExpression = require('../lib/isDefineWithObjectExpression')
const isDefineWithDependencies = require('../lib/isDefineWithDependencies')
const getDefineCallbackArguments = require('../lib/getDefineCallbackArguments')
const isNamedDefine = require('../lib/isNamedDefine')
const isReturnStatement = require('../lib/isReturnStatement')
const isVariableDeclaration = require('../lib/isVariableDeclaration')
const isRequireCallExpression = require('../lib/isRequireCallExpression')
const isExportsAssignmentExpression = require('../lib/isExportsAssignmentExpression')
const isExportsAssignmentExpressionStatement = require('../lib/isExportsAssignmentExpressionStatement')
const { array } = require('@buxlabs/utils')
const Harvester = require('./Harvester')

function changeReturnToExportDefaultDeclaration (node) {
  node.type = 'ExportDefaultDeclaration'
  node.declaration = node.argument
  delete node.argument
  return node
}

function changeExportsAssignmentExpressionToExportDeclaration (node) {
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

class Module extends AbstractSyntaxTree {
  convert (options) {
    var define = this.first('CallExpression[callee.name=define]')
    if (isDefineWithObjectExpression(define)) {
      this.ast.body = [{
        type: 'ExportDefaultDeclaration',
        declaration: define.arguments[0]
      }]
    } else {
      const harvester = new Harvester(this.ast)
      var imports = harvester.harvest()
      var nodes = this.getModuleCode()
      var code = this.generateCode(nodes, options)
      this.ast.body = imports.concat(code)
      this.removeEsModuleConvention()
      this.removeUseStrict()
    }
  }

  getModuleCode () {
    var body = []
    this.walk(node => {
      if (node.type === 'CallExpression' && (isDefineWithDependencies(node) || isNamedDefine(node))) {
        let define = getDefineCallbackArguments(node)
        if (define.body.type === 'BlockStatement') {
          body = define.body.body
        } else {
          body = [{ type: 'ReturnStatement', argument: define.body }]
        }
      }
    })
    return body
  }

  generateCode (code, options) {
    var nodes = code.map(node => {
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
    })

    return array.flatten(nodes).filter(Boolean)
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
