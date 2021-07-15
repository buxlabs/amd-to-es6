const fs = require('fs')
const path = require('path')
const AbstractSyntaxTree = require('abstract-syntax-tree')
const converter = require('../../index')
const Analyzer = require('../../src/class/Analyzer')
const Importer = require('../../src/class/Importer')

function normalize (string) {
  return string.replace(/\s+/g, '')
}

function compare (result, output) {
  return normalize(result) === normalize(output)
}

module.exports = {
  convert: function convert (dir, options) {
    options = options || {}
    const extension = options.jsx ? 'jsx' : 'js'
    const file1 = path.join(__dirname, '../fixture/', dir, '/input.' + extension)
    const file2 = path.join(__dirname, '../fixture/', dir, '/output.' + extension)
    const input = fs.readFileSync(file1, 'utf8')
    const expected = fs.readFileSync(file2, 'utf8')
    const result = converter(input, options)
    const isValid = compare(result, expected)
    if (!isValid) {
      console.log('-- INPUT --')
      console.log(input)
      console.log('-- EXPECTED --')
      console.log(expected)
      console.log('-- RESULT --')
      console.log(result)
    }
    return isValid
  },
  convertWithMap: function convertWithMap (dir, options) {
    options = options || {}
    const extension = options.jsx ? 'jsx' : 'js'
    const file1 = path.join(__dirname, '../fixture/', dir, '/input.' + extension)
    const file2 = path.join(__dirname, '../fixture/', dir, '/output.json')
    const input = fs.readFileSync(file1, 'utf8')
    const content = fs.readFileSync(file2, 'utf8')
    const result = converter(input, options)
    const expected = JSON.parse(content)
    const isValid = compare(result.source, expected.source) && compare(result.map, expected.map)
    if (!isValid) {
      console.log('-- INPUT --')
      console.log(input)
      console.log('-- EXPECTED --')
      console.log(expected)
      console.log('-- RESULT --')
      console.log(result)
    }
    return isValid
  },
  harvest: function harvest (dir) {
    const file1 = path.join(__dirname, '../fixture/', dir, '/input.js')
    const file2 = path.join(__dirname, '../fixture/', dir, '/harvest.json')
    const input = fs.readFileSync(file1, 'utf8')
    const expected = JSON.parse(fs.readFileSync(file2, 'utf8'))
    const ast = AbstractSyntaxTree.parse(input, { sourceType: 'module' })
    const analyzer = new Analyzer(ast)
    const harvester = new Importer(ast, { analyzer })
    const result = harvester.harvest()
    const isValid = JSON.stringify(expected) === JSON.stringify(result)
    if (!isValid) {
      console.log('-- EXPECTED --')
      console.log(JSON.stringify(expected, null, 2))
      console.log('-- RESULT --')
      console.log(JSON.stringify(result, null, 2))
    }
    return isValid
  }
}
