const AbstractSyntaxTree = require('@buxlabs/ast')
const isDefineWithExports = require('../lib/isDefineWithExports')
const isExportsMemberExpression = require('../lib/isExportsMemberExpression')

module.exports = class Exporter extends AbstractSyntaxTree {
  constructor (source, options) {
    super(...arguments)
    this.analyzer = options.analyzer
  }
  harvest () {
    const node = this.first('CallExpression[callee.name="define"]')
    if (!isDefineWithExports(node)) { return [] }
    return this.getExports()
  }
  getExports () {
    const nodes = this.find('AssignmentExpression')
    const exports = []
    const specifiers = []
    nodes.forEach(node => {
      if (!isExportsMemberExpression(node.left) || node.right.visited) return
      node.remove = true
      let names = [node.left.property.name]
      while (node.right.type === 'AssignmentExpression') {
        if (node.right.left.property) {
          names.push(node.right.left.property.name)
        }
        node.right = node.right.right
        node.right.visited = true
      }
      if (node.right.type === 'Identifier' && node.right.name === 'undefined') return
      const identifier = this.analyzer.createIdentifier()
      exports.push({
        type: 'VariableDeclaration',
        declarations: [
          {
            type: 'VariableDeclarator',
            id: { type: 'Identifier', name: identifier },
            init: node.right
          }
        ],
        kind: 'var'
      })
      for (let i = 0, length = names.length; i < length; i += 1) {
        specifiers.push({
          type: 'ExportSpecifier',
          local: { type: 'Identifier', name: identifier },
          exported: { type: 'Identifier', name: names[i] }
        })
      }
    })
    return exports.concat([{ type: 'ExportNamedDeclaration', specifiers }])
  }
}
