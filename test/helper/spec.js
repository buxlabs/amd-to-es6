const fs = require('fs')
const path = require('path')
const normalize = require('normalize-newline')
const AbstractSyntaxTree = require('abstract-syntax-tree')
const converter = require('../../index')
const Analyzer = require('../../src/class/Analyzer')
const Importer = require('../../src/class/Importer')

function compare (result, output) {
  return normalize(result).replace(/\s+/g, '') === normalize(output).replace(/\s+/g, '')
}

module.exports = {
  convert: function convert (dir, options) {
    options = options || {}
    let extension = options.jsx ? 'jsx' : 'js'
    let file1 = path.join(__dirname, '../fixture/', dir, '/input.' + extension)
    let file2 = path.join(__dirname, '../fixture/', dir, '/output.' + extension)
    let input = fs.readFileSync(file1, 'utf8')
    let expected = fs.readFileSync(file2, 'utf8')
    let result = converter(input, options)
    let isValid = compare(result, expected)
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
    let extension = options.jsx ? 'jsx' : 'js'
    let file1 = path.join(__dirname, '../fixture/', dir, '/input.' + extension)
    let file2 = path.join(__dirname, '../fixture/', dir, '/output.json')
    let input = fs.readFileSync(file1, 'utf8')
    let content = fs.readFileSync(file2, 'utf8')
    let result = converter(input, options)
    let expected = JSON.parse(content)
    let isValid = compare(result.source, expected.source) && compare(result.map, expected.map)
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
    let file1 = path.join(__dirname, '../fixture/', dir, '/input.js')
    let file2 = path.join(__dirname, '../fixture/', dir, '/harvest.json')
    let input = fs.readFileSync(file1, 'utf8')
    let expected = JSON.parse(fs.readFileSync(file2, 'utf8'))
    let ast = AbstractSyntaxTree.parse(input, { sourceType: 'module' })
    let analyzer = new Analyzer(ast)
    let harvester = new Importer(ast, { analyzer })
    let result = harvester.harvest()
    let isValid = JSON.stringify(expected) === JSON.stringify(result)
    if (!isValid) {
      console.log('-- EXPECTED --')
      console.log(JSON.stringify(expected, null, 2))
      console.log('-- RESULT --')
      console.log(JSON.stringify(result, null, 2))
    }
    return isValid
  }
}
