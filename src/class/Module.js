'use strict'

const AbstractSyntaxTree = require('@buxlabs/ast')
const getDefineDependencies = require('../lib/getDefineDependencies')
const generateImports = require('../lib/generateImports')
const isDefineWithObjectExpression = require('../lib/isDefineWithObjectExpression')
const isDefineWithDependencies = require('../lib/isDefineWithDependencies')
const getDefineCallbackArguments = require('../lib/getDefineCallbackArguments')
const isNamedDefine = require('../lib/isNamedDefine')
const isRequireSugarVariableDeclarator = require('../lib/isRequireSugarVariableDeclarator')
const isReturnStatement = require('../lib/isReturnStatement')
const isVariableDeclaration = require('../lib/isVariableDeclaration')
const isRequireCallExpression = require('../lib/isRequireCallExpression')
const isExportsAssignmentExpression = require('../lib/isExportsAssignmentExpression')
const isExportsAssignmentExpressionStatement = require('../lib/isExportsAssignmentExpressionStatement')
const getImportDeclaration = require('../lib/getImportDeclaration')
const getVariableDeclaration = require('../lib/getVariableDeclaration')
const getRequireCallExpressions = require('../lib/getRequireCallExpressions')
const changeRequireCallExpressionToIdentifier = require('../lib/changeRequireCallExpressionToIdentifier')
const isDefineWithFunctionExpression = require('../lib/isDefineWithFunctionExpression')
const { array } = require('@buxlabs/utils')

function changeReturnToExportDefaultDeclaration (node) {
  node.type = 'ExportDefaultDeclaration'
  node.declaration = node.argument
  delete node.argument
  return node
}

function changeVariableDeclaration (node, options) {
  return node.declarations.map(function (declarator) {
    var param = declarator.id.type === 'ObjectPattern' ? declarator.id : declarator.id.name
    if (isRequireSugarVariableDeclarator(declarator)) {
      var element = declarator.init && declarator.init.arguments && declarator.init.arguments[0].value
      return getImportDeclaration(element, param, options)
    }
    return getVariableDeclaration(node, declarator, param)
  })
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

function changeRequireCallExpressionToImportDeclaration (node, options) {
  return getImportDeclaration(node.expression.arguments[0].value, null, options)
}

function changeNestedRequireCallExpressionToNamedImportDeclaration (node, options) {
  return getImportDeclaration(node.arguments[0].value, null, options || { side: true })
}

function isAssignmentMemberExpression (node) {
  return node.type === 'ExpressionStatement' &&
        node.expression.type === 'AssignmentExpression' &&
        node.expression.left.type === 'MemberExpression' &&
        node.expression.right.type === 'CallExpression' &&
        node.expression.right.callee.name === 'require' &&
        node.expression.right.arguments.length === 1 &&
        node.expression.right.arguments[0].type === 'Literal'
}

function changeAssignmentMemberExpressionRequire (node, name) {
  node.expression.right = { type: 'Identifier', name: name }
  return node
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
      var dependencies = getDefineDependencies(define)
      var nodes = this.getModuleCode()
      var imports = generateImports(dependencies, options)
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
    var canHaveRequireSugar = this.hasDefineWithCallback()
    var imports = []
    var nodes = code.map(node => {
      if (canHaveRequireSugar && isVariableDeclaration(node)) {
        return changeVariableDeclaration(node, options)
      } else if (isRequireCallExpression(node)) {
        return changeRequireCallExpressionToImportDeclaration(node, options)
      } else if (isReturnStatement(node)) {
        return changeReturnToExportDefaultDeclaration(node)
      } else if (isAssignmentMemberExpression(node)) {
        var expression = changeNestedRequireCallExpressionToNamedImportDeclaration(node.expression.right, {
          side: true,
          assigned: true
        })
        imports.push(expression)
        return changeAssignmentMemberExpressionRequire(node, expression.specifiers[0].local.name)
      } else if (isExportsAssignmentExpressionStatement(node)) {
        var expressions = getRequireCallExpressions(node).map(changeNestedRequireCallExpressionToNamedImportDeclaration)
        if (expressions.length > 0) {
          imports = imports.concat(expressions)
          node = changeRequireCallExpressionToIdentifier(node)
        }
        return changeExportsAssignmentExpressionToExportDeclaration(node)
      }
      return node
    })

    return imports.concat(array.flatten(nodes)).filter(Boolean)
  }

  hasDefineWithCallback () {
    var has = false
    this.walk(node => {
      if (node.type === 'CallExpression' && isDefineWithFunctionExpression(node)) {
        has = true
      }
    })
    return has
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
