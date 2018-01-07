const AbstractSyntaxTree = require('@buxlabs/ast')
const isDefineWithExports = require('../lib/isDefineWithExports')

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
      if (node.left.type === 'MemberExpression' &&
        node.left.object &&
        node.left.object.name === 'exports' &&
        node.left.property &&
        node.left.property.type === 'Identifier'
      ) {
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
        specifiers.push({
          type: 'ExportSpecifier',
          local: {
            type: 'Identifier',
            name: identifier
          },
          exported: {
            type: 'Identifier',
            name: node.left.property.name
          }
        })
        node.remove = true
      }
    })
    return exports.concat([{ type: 'ExportNamedDeclaration', specifiers }])
  }
}
