import test from 'ava'
import fs from 'fs'
import path from 'path'
import converter from '../../index'

function compare (result, output) {
  return result.replace(/\s+/g, '') === output.replace(/\s+/g, '')
}

function convert (dir, options) {
  const file1 = path.join(__dirname, '../fixture/', dir, '/input.js')
  const file2 = path.join(__dirname, '../fixture/', dir, '/output.js')
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
}

function convertWithMap (dir, options, t) {
  const file1 = path.join(__dirname, '../fixture/', dir, '/input.js')
  const file2 = path.join(__dirname, '../fixture/', dir, '/output.json')
  const input = fs.readFileSync(file1, 'utf8')
  const expected = JSON.parse(fs.readFileSync(file2, 'utf8'))
  const result = converter(input, options)
  const isValid = compare(JSON.stringify(result), JSON.stringify(expected))

  if (!isValid) {
    console.log('-- INPUT --')
    console.log(input)
    console.log('-- EXPECTED --')
    console.log(expected)
    console.log('-- RESULT --')
    console.log(result)
  }
  return isValid  
}

test('the converter should be available', t => {
  t.truthy(typeof converter === 'function')
})

test('it should work for an anonymous module', t => {
  t.truthy(convert('amdjs-api/anonymous-module'))
})

test('it should work for a dependency free module', t => {
  t.truthy(convert('amdjs-api/dependency-free-module'))
})

test('it should work for simplified commonjs wrapping', t => {
  t.truthy(convert('amdjs-api/simplified-commonjs-wrapping'))
})

test('it should work for simplified commonjs wrapping that returns a literal', t => {
  t.truthy(convert('amdjs-api/simplified-commonjs-wrapping-returns-literal'))
})

test('it should work for named simplified commonjs wrapping', t => {
  t.truthy(convert('amdjs-api/named-simplified-commonjs-wrapping'))
})

test('it should work for named simplified commonjs wrapping with sugar', t => {
  t.truthy(convert('amdjs-api/named-simplified-commonjs-wrapping-with-sugar'))
})

test('it should work for named simplified commonjs wrapping with sugar', t => {
  t.truthy(convert('amdjs-api/named-simplified-commonjs-wrapping-with-sugar-second'))
})

test('it should work for named module', t => {
  t.truthy(convert('amdjs-api/named-module'))
})

test('it should work for named module with arrow function', t => {
  t.truthy(convert('amdjs-api/named-module-arrow-fn'))
})

test('it should work for an anonymous module', t => {
  t.truthy(convert('rjs-examples/simple-define'))
})

test('it should work for named dependencies', t => {
  t.truthy(convert('rjs-examples/function-wrapping'))
})

test('it should convert empty array in define correctly', t => {
  t.truthy(convert('define/callback-empty-array'))
})

test('it should convert empty array in define with array function correctly', t => {
  t.truthy(convert('define/arrow-function-callback-empty-array'))
})

test('it should convert define with callback only correctly using the built in parser', t => {
  t.truthy(convert('define/callback-only'))
})

test('it should convert empty define with arrow function correctly', t => {
  t.truthy(convert('define/arrow-function-callback-only'))
})

test('it should convert define with deps correctly', t => {
  t.truthy(convert('define/arrow-function-callback-with-deps'))
})

test('it should convert define with arrow function with immediate return', t => {
  t.truthy(convert('define/arrow-function-immediate-return'))
})

test('it should convert define with arrow function with immediate function return', t => {
  t.truthy(convert('define/arrow-function-immediate-return-function'))
})

test('it should convert define with deps with arrow function correctly', t => {
  t.truthy(convert('define/callback-with-deps'))
})

test('it should convert modules wrapped with iife correctly', t => {
  t.truthy(convert('define/iife'))
})

test('it should convert quotes correctly', t => {
  t.truthy(convert('define/quotes'))
})

test('it should convert define with an object in callback only correctly', t => {
  t.truthy(convert('define/object-only'))
})

test("it shouldn't convert files with no define", t => {
  t.truthy(convert('define/no-define'))
})

test('it should leave single line comments if required', t => {
  t.truthy(convert('define/single-line-comments', { comments: true }))
})

test('it should leave multi line comments if required', t => {
  t.truthy(convert('define/multi-line-comments', { comments: true }))
})

test('it should leave single line comments in code if required', t => {
  t.truthy(convert('define/comments', { comments: true }))
})

test('it should convert define with unused deps correctly', t => {
  t.truthy(convert('define/callback-with-mismatch-deps'))
})

test('it should keep dependencies with side effects', t => {
  t.truthy(convert('app/behavior_1'))
})

test('it should keep dependencies with side effects', t => {
  t.truthy(convert('app/behavior_2'))
})

test('it should convert controllers correctly', t => {
  t.truthy(convert('app/controller_1'))
})

test('it should keep dependencies with side effects', t => {
  t.truthy(convert('app/controller_2'))
})

test('it should work with const', t => {
  t.truthy(convert('app/controller_3'))
})

test('it should work with let', t => {
  t.truthy(convert('app/controller_4'))
})

test('it should keep custom object assignments', t => {
  t.truthy(convert('app/enum_1'))
})

test('it should leave empty var statements', t => {
  t.truthy(convert('app/helper_1'))
})

test('it should leave empty var statements', t => {
  t.truthy(convert('app/helper_2'))
})

test('it should work for named dependencies', t => {
  t.truthy(convert('app/helper_3'))
})

test('it should leave empty var statements', t => {
  t.truthy(convert('app/model_1'))
})

test('it should handle returns of objects', t => {
  t.truthy(convert('app/model_2'))
})

test('it should convert views correctly', t => {
  t.truthy(convert('app/view_1'))
})

test('it should convert modules with functions after the return correctly', t => {
  t.truthy(convert('app/view_2'))
})

test('it should convert modules with constructors assigned to variables correctly', t => {
  t.truthy(convert('app/view_3'))
})

test('it should handle a var declaration which is moved to a separate line', t => {
  t.truthy(convert('app/view_4'))
})

test('it should drop an empty define', t => {
  t.truthy(convert('app/view_spec_1'))
})

test('it should convert subapps correctly', t => {
  t.truthy(convert('app/subapp_1'))
})

test('it should covert subapp specs correctly', t => {
  t.truthy(convert('app/subapp_spec_1', { quotes: 'double' }))
})

test('it should convert modules with one require sugar call expression correctly', t => {
  t.truthy(convert('app/module_1'))
})

test('it should convert modules with multiple require sugar call expressions correctly', t => {
  t.truthy(convert('app/module_2'))
})

test('it should convert module specs correctly', t => {
  t.truthy(convert('app/module_spec_1'))
})

test('it should convert troopjs components correctly', t => {
  t.truthy(convert('web-examples/troopjs_component_1'))
})

test('it should convert troopjs components correctly', t => {
  t.truthy(convert('web-examples/troopjs_component_2'))
})

test('it should convert require sugar correctly', t => {
  t.truthy(convert('define/require-sugar'))
})

test('it should convert require sugar with side effects correctly', t => {
  t.truthy(convert('define/require-sugar-with-side-effect'))
})

test('it should convert require with property assignment correctly', t => {
  t.truthy(convert('define/require-sugar-with-property-assignment'))
})

test('it should convert todomvc backbone requirejs example correctly', t => {
  t.truthy(convert('web-examples/todomvc_backbone_requirejs_1'))
})

test('it should convert todomvc backbone requirejs example correctly', t => {
  t.truthy(convert('web-examples/todomvc_backbone_requirejs_2'))
})

test('it should convert todomvc backbone requirejs example correctly', t => {
  t.truthy(convert('web-examples/todomvc_backbone_requirejs_3'))
})

test('it should convert todomvc angular requirejs example correctly', t => {
  t.truthy(convert('web-examples/todomvc_angularjs_requirejs_1'))
})

test('it should convert todomvc angular requirejs example correctly', t => {
  t.truthy(convert('web-examples/todomvc_angularjs_requirejs_2'))
})

test('it should convert todomvc angular requirejs example correctly', t => {
  t.truthy(convert('web-examples/todomvc_angularjs_requirejs_3'))
})

test('it should convert todomvc knockout requirejs example correctly', t => {
  t.truthy(convert('web-examples/todomvc_knockout_requirejs_1'))
})

test('it should convert todomvc lavaca requirejs example correctly', t => {
  t.truthy(convert('web-examples/todomvc_lavaca_requirejs_1'))
})

test('it should convert todomvc somajs requirejs example correctly', t => {
  t.truthy(convert('web-examples/todomvc_somajs_requirejs_1'))
})

test('it should convert todomvc somajs requirejs example correctly', t => {
  t.truthy(convert('web-examples/todomvc_somajs_requirejs_2'))
})


test('it should return sourcemaps', t => {
  t.truthy(convertWithMap('source-maps', { sourceMap: true }, t))
})

test('it should return sourcemaps with file reference', t => {
  t.truthy(convertWithMap('source-maps/named', { sourceMap: true, sourceFile: 'file1.js', sourceRoot: 'path/to/file'  }, t))
})
