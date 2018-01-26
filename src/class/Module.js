'use strict'

const AbstractSyntaxTree = require('@buxlabs/ast')
const isDefineWithObjectExpression = require('../lib/isDefineWithObjectExpression')
const getDefineCallbackArguments = require('../lib/getDefineCallbackArguments')
const isReturnStatement = require('../lib/isReturnStatement')
const isVariableDeclaration = require('../lib/isVariableDeclaration')
const isRequireCallExpression = require('../lib/isRequireCallExpression')
const changeReturnToExportDefaultDeclaration = require('../lib/changeReturnToExportDefaultDeclaration')
const Analyzer = require('./Analyzer')
const Importer = require('./Importer')
const Exporter = require('./Exporter')

class Module extends AbstractSyntaxTree {
  constructor () {
    super(...arguments)
    this.analyzer = new Analyzer(this.ast)
    this.importer = new Importer(this.ast, { analyzer: this.analyzer })
    this.exporter = new Exporter(this.ast, { analyzer: this.analyzer })
  }
  convert (options) {
    const define = this.first('CallExpression[callee.name=define]')
    if (isDefineWithObjectExpression(define)) {
      this.ast.body = [{
        type: 'ExportDefaultDeclaration',
        declaration: define.arguments[0]
      }]
    } else {
      const imports = this.importer.harvest()
      const exports = this.exporter.harvest()
      const body = this.getBody(define)
      const code = this.getCode(body, options)
      this.ast.body = imports.concat(code, exports)
      this.clean()
    }
  }

  getBody (node) {
    let args = getDefineCallbackArguments(node)
    if (args.body.type === 'BlockStatement') {
      return args.body.body
    }
    return [{ type: 'ExportDefaultDeclaration', declaration: args.body }]
  }

  getCode (body, options) {
    return body.map(node => {
      if (isReturnStatement(node)) {
        return changeReturnToExportDefaultDeclaration(node)
      } else if (isRequireCallExpression(node)) {
        return null
      } else if (isVariableDeclaration(node)) {
        node.declarations = node.declarations.filter(declaration => {
          if (declaration.init &&
            declaration.init.type === 'CallExpression' &&
            declaration.init.callee.name === 'require') {
            return false
          }
          return true
        })
        return node
      }
      return node
    }).filter(Boolean)
  }

  transformTree () {
    let cid = 1
    this.walk((node, parent) => {
      node.cid = cid++
      if (node.replacement) {
        parent[node.replacement.parent] = node.replacement.child
      } else if (node.remove) {
        this.remove(node)
      } else if (node.type === 'IfStatement' && node.test.value === true) {
        parent.body = parent.body.reduce((result, item) => {
          return result.concat(node.cid === item.cid ? node.consequent.body : item)
        }, [])
      }
    })
  }

  clean () {
    this.transformTree()
    this.removeEsModuleConvention()
    this.removeUseStrict()
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
