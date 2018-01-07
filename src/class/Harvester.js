const AbstractSyntaxTree = require('@buxlabs/ast')
const isDefineWithObjectExpression = require('../lib/isDefineWithObjectExpression')
const isDefineWithArrayAndCallback = require('../lib/isDefineWithArrayAndCallback')
const isDefineWithFunctionExpression = require('../lib/isDefineWithFunctionExpression')
const getDefineDependencies = require('../lib/getDefineDependencies')
const generateImports = require('../lib/generateImports')
const getImportDeclaration = require('../lib/getImportDeclaration')
const isRequireCallExpression = require('../lib/isRequireCallExpression')
const isRequireSugarVariableDeclarator = require('../lib/isRequireSugarVariableDeclarator')
const isMemberRequireCallExpression = require('../lib/isMemberRequireCallExpression')
const isAssignmentMemberExpression = require('../lib/isAssignmentMemberExpression')

class Harvester extends AbstractSyntaxTree {
  harvest () {
    const node = this.first('CallExpression[callee.name="define"]')
    if (!node || isDefineWithObjectExpression(node)) { return [] }
    if (isDefineWithArrayAndCallback(node)) {
      return this.getDefineDependencies(node).concat(
        this.getRequireSugarDependencies()
      )
    } else if (isDefineWithFunctionExpression(node)) {
      return this.getRequireSugarDependencies()
    }
    return []
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
    return getImportDeclaration(node.callee.object.arguments[0].value)
  }
  getAssignmentExpressionRequire (node) {
    return getImportDeclaration(node.right.arguments[0].value)
  }
}

module.exports = Harvester
