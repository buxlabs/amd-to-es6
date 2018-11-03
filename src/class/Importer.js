'use strict'

const AbstractSyntaxTree = require('abstract-syntax-tree')
const isDefineWithDependencies = require('../lib/isDefineWithDependencies')
const getDefineDependencies = require('../lib/getDefineDependencies')
const generateImports = require('../lib/generateImports')
const getImportDeclaration = require('../lib/getImportDeclaration')
const isRequireCallExpression = require('../lib/isRequireCallExpression')
const isRequireSugarVariableDeclarator = require('../lib/isRequireSugarVariableDeclarator')
const isMemberRequireCallExpression = require('../lib/isMemberRequireCallExpression')
const isAssignmentMemberExpression = require('../lib/isAssignmentMemberExpression')

module.exports = class Importer extends AbstractSyntaxTree {
  constructor (source, options) {
    super(source, options)
    this.analyzer = options.analyzer
  }
  harvest () {
    const node = this.first('CallExpression[callee.name="define"]')
    if (!isDefineWithDependencies(node)) { return [] }
    return this.getDefineDependencies(node).concat(
      this.getRequireSugarDependencies()
    )
  }
  getDefineDependencies (node) {
    return generateImports(getDefineDependencies(node))
  }
  getRequireSugarDependencies () {
    const nodes = []
    this.walk(node => {
      if (isRequireSugarVariableDeclarator(node)) {
        nodes.push(this.getVariableDeclaratorRequire(node))
      } else if (isRequireCallExpression(node)) {
        nodes.push(this.getExpressionStatementRequire(node))
      } else if (isMemberRequireCallExpression(node)) {
        nodes.push(this.getMemberExpressionRequire(node))
      } else if (isAssignmentMemberExpression(node)) {
        nodes.push(this.getAssignmentExpressionRequire(node))
      }
    })
    return nodes
  }
  getExpressionStatementRequire (node) {
    return getImportDeclaration(node.expression.arguments[0].value)
  }
  getVariableDeclaratorRequire (node) {
    var param = node.id.type === 'ObjectPattern' ? node.id : node.id.name
    var element = node.init && node.init.arguments && node.init.arguments[0].value
    return getImportDeclaration(element, param)
  }
  getMemberExpressionRequire (node) {
    const identifier = this.analyzer.createIdentifier()
    node.callee.object.replacement = {
      parent: 'object',
      child: { type: 'Identifier', name: identifier }
    }
    return getImportDeclaration(node.callee.object.arguments[0].value, identifier)
  }
  getAssignmentExpressionRequire (node) {
    const identifier = this.analyzer.createIdentifier()
    node.right.replacement = {
      parent: 'right',
      child: { type: 'Identifier', name: identifier }
    }
    return getImportDeclaration(node.right.arguments[0].value, identifier)
  }
}
