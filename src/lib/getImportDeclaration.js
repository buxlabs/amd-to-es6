'use strict'

const getIdentifierName = require('./getIdentifierName')

module.exports = function (element, param, options) {
  var specifiers = []
  if (param || (options && options.side)) {
    if (param && param.type === 'ObjectPattern') {
      param.properties.forEach(property => {
        specifiers.push({
          type: 'ImportSpecifier',
          imported: { type: 'Identifier', name: property.key.name },
          local: { type: 'Identifier', name: property.value.name }
        })
      })
    } else {
      specifiers.push({
        type: 'ImportDefaultSpecifier',
        local: {
          type: 'Identifier',
          name: getIdentifierName(element, param, options)
        }
      })
    }
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
