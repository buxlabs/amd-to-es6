'use strict'

const getIdentifierName = require('./getIdentifierName')

module.exports = function (element, param, options) {
  var specifiers = []
  if (param || (options && options.side)) {
    specifiers.push({
      type: 'ImportDefaultSpecifier',
      local: {
        type: 'Identifier',
        name: getIdentifierName(element, param, options)
      }
    })
  }

  return {
    type: 'ImportDeclaration',
    specifiers: specifiers,
    source: {
      type: 'Literal',
      value: element
    }
  }
}
