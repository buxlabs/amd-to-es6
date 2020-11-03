'use strict'

const isDefineWithArrayAndCallback = require('./isDefineWithArrayAndCallback')

function getArrayExpressionValues (node) {
  return node.elements.map(element => element.value)
}

function getFunctionParameters (node) {
  return node.params.map(param => {
    if (param.type === 'ObjectPattern') {
      return param
    }
    return param.name
  })
}

module.exports = function (node) {
  if (!isDefineWithArrayAndCallback(node)) { return [] }
  const length = node.arguments.length
  const elements = getArrayExpressionValues(node.arguments[length - 2])
  const params = getFunctionParameters(node.arguments[length - 1])
  return elements.map((element, index) => {
    return {
      element: element,
      param: params[index]
    }
  })
}
