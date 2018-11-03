'use strict'

const AbstractSyntaxTree = require('abstract-syntax-tree')
const utils = require('pure-utilities')
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
