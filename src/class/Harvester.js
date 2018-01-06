const AbstractSyntaxTree = require('@buxlabs/ast')
const isDefineWithObjectExpression = require('../lib/isDefineWithObjectExpression')
const isDefineWithArrayAndCallback = require('../lib/isDefineWithArrayAndCallback')
const isDefineWithFunctionExpression = require('../lib/isDefineWithFunctionExpression')
const getDefineDependencies = require('../lib/getDefineDependencies')
const generateImports = require('../lib/generateImports')

class Harvester extends AbstractSyntaxTree {
  harvest () {
    const nodes = this.collect()
    return this.transform(nodes)
  }
  collect () {
    const node = this.first('CallExpression[callee.name="define"]')
    if (!node || isDefineWithObjectExpression(node)) { return [] }
    if (isDefineWithArrayAndCallback(node)) {
      return getDefineDependencies(node)
    } else if (isDefineWithFunctionExpression(node)) {
      // console.log(node)
    }
    return []
  }
  transform (nodes) {
    return generateImports(nodes)
  }
}

module.exports = Harvester
