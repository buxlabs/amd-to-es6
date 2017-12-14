'use strict'

const AbstractSyntaxTree = require('@buxlabs/ast')
const getDependencies = require('../lib/getDependencies')
const getModuleCode = require('../lib/getModuleCode')
const generateImports = require('../lib/generateImports')
const generateCode = require('../lib/generateCode')
const isDefineWithObjectExpression = require('../lib/isDefineWithObjectExpression')
const escodegen = require('escodegen')

class Module extends AbstractSyntaxTree {
  constructor (source, options) {
    super(source, options)
    options = options || {}
    this.ast = super.constructor.parse(source, {
      sourceType: 'module',
      loc: true,
      comment: options.comments,
      attachComment: options.comments
    })
  }
  convert (options) {
    var define = this.first('CallExpression[callee.name=define]')
    if (isDefineWithObjectExpression(define)) {
      this.ast.body = [{
        type: 'ExportDefaultDeclaration',
        declaration: define.arguments[0]
      }]
    } else {
      var dependencies = getDependencies(define)
      var nodes = getModuleCode(this.ast)
      var imports = generateImports(dependencies, options)
      var code = generateCode(this.ast, nodes, options)
      this.ast.body = imports.concat(code)
      this.removeUseStrict()
    }
  }

  removeUseStrict () {
    this.remove({
      type: 'ExpressionStatement',
      expression: {
        type: 'Literal',
        value: 'use strict'
      }
    })
  }

  toSource (options) {
    const originalSource = this.source
    const code = super.toSource(options)

    if (options.sourceMap) {
      const map = escodegen.generate(this.ast, {
        sourceMap: options.sourceFile || 'UNKNOWN', // Escodegen needs always a source filename
        sourceMapRoot: options.sourceRoot || '',
        sourceContent: originalSource,
        comment: options.comments
      })
      return { code, map }
    } else {
      return code
    }
  }
}

module.exports = Module
