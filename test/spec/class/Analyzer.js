const test = require('ava')
const Analyzer = require('../../../src/class/Analyzer')

test('it returns all identifiers from given ast', assert => {
  const source = 'var x = 0'
  const analyzer = new Analyzer(source)
  assert.deepEqual(analyzer.identifiers, ['x'])
})

test('it returns unique identifiers', assert => {
  const source = 'var x = 0; x += 1'
  const analyzer = new Analyzer(source)
  assert.deepEqual(analyzer.identifiers, ['x'])
})

test('it returns a new free identifier', assert => {
  const source = 'var a = 0;'
  const analyzer = new Analyzer(source)
  assert.deepEqual(analyzer.identifiers, ['a'])
  assert.deepEqual(analyzer.createIdentifier(), 'b')
  assert.deepEqual(analyzer.identifiers, ['a', 'b'])
  assert.deepEqual(analyzer.createIdentifier(), 'c')
  assert.deepEqual(analyzer.identifiers, ['a', 'b', 'c'])
})
