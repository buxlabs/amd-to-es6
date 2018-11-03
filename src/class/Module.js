'use strict'

const AbstractSyntaxTree = require('abstract-syntax-tree')
const isDefineWithObjectExpression = require('../lib/isDefineWithObjectExpression')
const getDefineCallbackArguments = require('../lib/getDefineCallbackArguments')
const isReturnStatement = require('../lib/isReturnStatement')
const isVariableDeclaration = require('../lib/isVariableDeclaration')
const isRequireCallExpression = require('../lib/isRequireCallExpression')
const changeReturnToExportDefaultDeclaration = require('../lib/changeReturnToExportDefaultDeclaration')
const Analyzer = require('./Analyzer')
const Importer = require('./Importer')
const Exporter = require('./Exporter')

function getImmediatelyInvokedFunctionExpression (body) {
  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'FunctionExpression',
        params: [],
        body: {
          type: 'BlockStatement',
          body
        }
      },
      arguments: []
    }
  }
}

class Module extends AbstractSyntaxTree {
  constructor (source, options) {
    super(source, options)
    this.transform(options)
    this.analyzer = new Analyzer(this.ast)
    this.importer = new Importer(this.ast, { analyzer: this.analyzer })
    this.exporter = new Exporter(this.ast, { analyzer: this.analyzer })
  }
  static parse (source, options) {
    options.next = true
    return AbstractSyntaxTree.parse(source, options)
  }
  convert (options) {
    const define = this.first('CallExpression[callee.name=define]')
    if (isDefineWithObjectExpression(define)) {
      this.ast.body = [{
        type: 'ExportDefaultDeclaration',
        declaration: define.arguments[0]
      }]
    } else {
      this.prepare(define)
      const imports = this.importer.harvest()
      const exports = this.exporter.harvest()
      const body = this.getBody(define)
      const code = this.getCode(body, options)
      this.ast.body = imports.concat(code, exports)
      this.clean()
    }
  }

  prepare (define) {
    this.removeTrueIfStatements()
    this.flattenAssignments()
    this.wrapMultipleReturns(define)
  }

  removeTrueIfStatements () {
    let cid = 1
    this.walk(function (node, parent) {
      node.cid = cid
      cid += 1
      if (node.type === 'IfStatement' && node.test.value === true) {
        parent.body = parent.body.reduce((result, item) => {
          return result.concat(node.cid === item.cid ? node.consequent.body : item)
        }, [])
      }
    })
  }

  flattenAssignments () {
    let cid = 1
    this.walk((node, parent) => {
      node.cid = cid
      cid += 1
      if (node.type === 'ExpressionStatement' && node.expression.type === 'AssignmentExpression') {
        if (node.expression.left.type === 'MemberExpression' &&
            node.expression.left.object.name === 'exports' &&
            node.expression.right.type === 'AssignmentExpression') {
          let cache = [node.expression]
          let right = node.expression.right
          while (right.type === 'AssignmentExpression') {
            cache.push(right)
            right = right.right
          }
          const identifier = this.analyzer.createIdentifier()
          const container = {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: { type: 'Identifier', name: identifier },
                init: right
              }
            ],
            kind: 'var'
          }
          cache = cache.reverse().map(current => {
            return {
              type: 'ExpressionStatement',
              expression: {
                type: 'AssignmentExpression',
                left: current.left,
                right: { type: 'Identifier', name: identifier },
                operator: '='
              }
            }
          })
          cache.unshift(container)
          parent.body = parent.body.reduce((result, item) => {
            return result.concat(node.cid === item.cid ? cache : item)
          }, [])
        }
      }
    })
  }

  wrapMultipleReturns (node) {
    let args = getDefineCallbackArguments(node)
    if (args.body.type === 'BlockStatement') {
      const types = args.body.body.map(leaf => leaf.type)
      if (!types.includes('ReturnStatement') && types.includes('IfStatement')) {
        args.body.body = [{ type: 'ReturnStatement', argument: getImmediatelyInvokedFunctionExpression(args.body.body) }]
      }
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
    this.walk((node, parent) => {
      if (node.replacement) {
        parent[node.replacement.parent] = node.replacement.child
      } else if (node.remove) {
        this.remove(node)
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

  transform (options) {
    this.transformations = []
    if (options.jsx) {
      this.transformJsxNodes()
    }
  }

  transformJsxNodes () {
    let count = 0
    this.replace({
      enter: node => {
        if (node.type === 'JSXElement') {
          count += 1
          const name = '$$JSXElement_' + count + '$$'
          this.transformations.push({
            node: node,
            name: name
          })
          return { type: 'Identifier', name: name }
        }
        return node
      }
    })
  }

  toSource (options) {
    let source = super.toSource(options)
    this.transformations.forEach(transformation => {
      // jsxcodegen will be used in the line below
      const code = transformation.node
      source = source.replace(transformation.name, code)
    })
    return source
  }
}

module.exports = Module
