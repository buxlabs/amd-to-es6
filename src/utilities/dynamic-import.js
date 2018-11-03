// dependent modules like estraverse can't handle dynamic imports yet
// hope they'll soon

module.exports = {
  convertDynamicImport (text) {
    return text.replace(/import\(/g, 'DYNAMIC_IMPORT_PLACEHOLDER(')
  },
  revertDynamicImportConversion (text) {
    return text.replace(/DYNAMIC_IMPORT_PLACEHOLDER\(/g, 'import(')
  }
}
