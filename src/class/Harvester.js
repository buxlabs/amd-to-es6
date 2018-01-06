const AbstractSyntaxTree = require('@buxlabs/ast')
const isDefineWithObjectExpression = require('../lib/isDefineWithObjectExpression')
const isDefineWithArrayAndCallback = require('../lib/isDefineWithArrayAndCallback')
const isDefineWithFunctionExpression = require('../lib/isDefineWithFunctionExpression')
const getDefineDependencies = require('../lib/getDefineDependencies')
const generateImports = require('../lib/generateImports')
const getImportDeclaration = require('../lib/getImportDeclaration')

class Harvester extends AbstractSyntaxTree {
  harvest () {
    const nodes = this.collect()
    return this.transform(nodes)
  }
  collect () {
    const node = this.first('CallExpression[callee.name="define"]')
    if (!node || isDefineWithObjectExpression(node)) { return [] }
    if (isDefineWithArrayAndCallback(node)) {
      return generateImports(getDefineDependencies(node))
    } else if (isDefineWithFunctionExpression(node)) {
      return this.getRequireSugarDependencies()
    }
    return []
  }
  transform (nodes) {
    // TODO transform nodes in the last stage?
    return nodes
  }
  getRequireSugarDependencies () {
    // TODO iterate over the DOM instead so that
    // order of the dependencies is preserved
    return [].concat(
      this.getExpressionStatementRequire(),
      this.getVariableDeclaratorRequire()
    )
  }
  getExpressionStatementRequire () {
    const selector = 'ExpressionStatement > CallExpression[callee.name="require"]'
    return this.find(selector).map(node => {
      return getImportDeclaration(node.arguments[0].value, null) // pass options?
    })
  }
  getVariableDeclaratorRequire () {
    const selector = 'VariableDeclaration > VariableDeclarator[init.callee.name="require"]'
    return this.find(selector).map(node => {
      var param = node.id.type === 'ObjectPattern' ? node.id : node.id.name
      var element = node.init && node.init.arguments && node.init.arguments[0].value
      return getImportDeclaration(element, param) // pass options?
    })
  }
}

module.exports = Harvester
