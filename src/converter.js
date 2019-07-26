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

  let code = module.source
  code = revertDynamicImportConversion(code)

  if (options.sourceMap) {
    let map = module.map
    map = revertDynamicImportConversion(map)
    return { source: code, map }
  }

  return code
}
