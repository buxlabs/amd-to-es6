'use strict'

const AbstractSyntaxTree = require('@buxlabs/ast')
const getDependencies = require('../lib/getDependencies')
const getModuleCode = require('../lib/getModuleCode')
const generateImports = require('../lib/generateImports')
const generateCode = require('../lib/generateCode')
const isDefineWithObjectExpression = require('../lib/isDefineWithObjectExpression')

class Module extends AbstractSyntaxTree {
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
      this.removeEsModuleConvention()
      this.removeUseStrict()
    }
  }

  removeEsModuleConvention () {
    var object = '[expression.callee.object.name=Object]'
    var property = '[expression.callee.property.name=defineProperty]'
    var selector = `ExpressionStatement${object}${property}`
    var nodes = this.find(selector)
    nodes.forEach(node => {
      var args = node.expression.arguments
      if (args.length > 2 &&
        args[0].type === 'Identifier' && args[0].name === 'exports' &&
        args[1].type === 'Literal' && args[1].value === '__esModule'
      ) {
        this.remove(node)
      }
    })
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
}

module.exports = Module
