const AbstractSyntaxTree = require('@buxlabs/ast')
const { array } = require('@buxlabs/utils')
const unique = require('array-uniq')

module.exports = class Analyzer extends AbstractSyntaxTree {
  constructor () {
    super(...arguments)
    this.identifiers = this.getIdentifiers()
  }
  getIdentifiers () {
    return unique(this.find('Identifier').map(identifier => identifier.name))
  }
  createIdentifier () {
    const identifier = array.identifier(this.identifiers)
    this.identifiers.push(identifier)
    return identifier
  }
}
