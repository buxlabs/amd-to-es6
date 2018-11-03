'use strict'

const Module = require('./class/Module')
const { convertDynamicImport, revertDynamicImportConversion } = require('./utilities/dynamic-import')

module.exports = function (source, options) {
  options = options || {}
  if (source.indexOf('define') === -1) { return source }
  source = convertDynamicImport(source)

  const module = new Module(source, options)

  if (module.has('CallExpression[callee.name="define"]')) {
    module.convert(options)
  }

  let code = module.toSource(options)

  if (typeof code === 'string') {
    code = revertDynamicImportConversion(code)
  } else if (typeof code === 'object') {
    code.source = revertDynamicImportConversion(code.source)
    code.map = revertDynamicImportConversion(code.map)
  }

  return code
}
