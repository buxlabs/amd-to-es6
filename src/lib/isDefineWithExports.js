module.exports = function (node) {
  const length = node && node.arguments && node.arguments.length
  return node.arguments[length - 1].params.map(param => param.name).indexOf('exports') >= 0
}
