'use strict'

const AbstractSyntaxTree = require('@buxlabs/ast')
const utils = require('@buxlabs/utils')
const unique = require('array-uniq')

module.exports = class Analyzer extends AbstractSyntaxTree {
  constructor (source, options) {
    super(source, options)
    this.identifiers = this.getIdentifiers()
  }
  getIdentifiers () {
    return unique(this.find('Identifier').map(identifier => identifier.name))
  }
  createIdentifier () {
    const identifier = utils.array.identifier(this.identifiers)
    this.identifiers.push(identifier)
    return identifier
  }
}
