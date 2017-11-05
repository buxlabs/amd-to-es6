const string = require('underscore.string')
var count = 0

module.exports = function (element, param, options) {
  if (param) { return param }
  if (options && options.assigned) {
    count += 1
    return '$ASSIGNED_' + count
  }
  return string.camelize(element.replace('.', '-'))
}
