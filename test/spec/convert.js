import test from 'ava'
import { convert, convertWithMap } from '../helper/spec'

test('(convert) it works for an anonymous module', assert => {
  assert.truthy(convert('amdjs-api/anonymous-module'))
})

test('(convert) it works for a dependency free module', assert => {
  assert.truthy(convert('amdjs-api/dependency-free-module'))
})

test('(convert) it works for named module', assert => {
  assert.truthy(convert('amdjs-api/named-module'))
})

test('(convert) it works for named module with arrow function', assert => {
  assert.truthy(convert('amdjs-api/named-module-arrow-fn'))
})

test('(convert) it works for simple define statements', assert => {
  assert.truthy(convert('rjs-examples/simple-define'))
})

test('(convert) it works for named dependencies', assert => {
  assert.truthy(convert('rjs-examples/function-wrapping'))
})

test('(convert) it converts empty array in define correctly', assert => {
  assert.truthy(convert('define/callback-empty-array'))
})

test('(convert) it converts empty array in define with array function correctly', assert => {
  assert.truthy(convert('define/arrow-function-callback-empty-array'))
})

test('(convert) it converts define with callback only correctly using the built in parser', assert => {
  assert.truthy(convert('define/callback-only'))
})

test('(convert) it converts empty define with arrow function correctly', assert => {
  assert.truthy(convert('define/arrow-function-callback-only'))
})

test('(convert) it converts define with deps correctly', assert => {
  assert.truthy(convert('define/arrow-function-callback-with-deps'))
})

test('(convert) it converts define with arrow function with immediate return', assert => {
  assert.truthy(convert('define/arrow-function-immediate-return'))
})

test('(convert) it converts define with arrow function with immediate function return', assert => {
  assert.truthy(convert('define/arrow-function-immediate-return-function'))
})

test('(convert) it converts define with deps with arrow function correctly', assert => {
  assert.truthy(convert('define/callback-with-deps'))
})

test('(convert) it converts modules wrapped with iife correctly', assert => {
  assert.truthy(convert('define/iife'))
})

test('(convert) it converts quotes correctly', assert => {
  assert.truthy(convert('define/quotes'))
})

test.skip('(convert) it converts single quotes correctly', assert => {
  assert.truthy(convert('quotes/single', { quotes: 'single' }))
})

test.skip('(convert) it converts double quotes correctly', assert => {
  assert.truthy(convert('quotes/double', { quotes: 'double' }))
})

test('(convert) it converts auto quotes correctly', assert => {
  assert.truthy(convert('quotes/auto', { quotes: 'auto' }))
})

test('(convert) it converts define with an object in callback only correctly', assert => {
  assert.truthy(convert('define/object-only'))
})

test("(convert) it shouldn't convert files with no define", assert => {
  assert.truthy(convert('define/no-define'))
})

test('(convert) it converts define with unused deps correctly', assert => {
  assert.truthy(convert('define/callback-with-mismatch-deps'))
})

test('(convert) it keeps dependencies with side effects (behavior 1)', assert => {
  assert.truthy(convert('app/behavior_1'))
})

test('(convert) it keeps dependencies with side effects (behavior 2)', assert => {
  assert.truthy(convert('app/behavior_2'))
})

test('(convert) it converts controllers correctly', assert => {
  assert.truthy(convert('app/controller_1'))
})

test('(convert) it keeps dependencies with side effects (controller 2)', assert => {
  assert.truthy(convert('app/controller_2'))
})

test('(convert) it works with const', assert => {
  assert.truthy(convert('app/controller_3'))
})

test('(convert) it works with let', assert => {
  assert.truthy(convert('app/controller_4'))
})

test('(convert) it keeps custom object assignments', assert => {
  assert.truthy(convert('app/enum_1'))
})

test('(convert) it leaves empty var statements (helper 1)', assert => {
  assert.truthy(convert('app/helper_1'))
})

test('(convert) it leaves empty var statements (helper 2)', assert => {
  assert.truthy(convert('app/helper_2'))
})

test('(convert) it works for named dependencies (helper 3)', assert => {
  assert.truthy(convert('app/helper_3'))
})

test('(convert) it leaves empty var statements (model 1)', assert => {
  assert.truthy(convert('app/model_1'))
})

test('(convert) it handles returns of objects', assert => {
  assert.truthy(convert('app/model_2'))
})

test('(convert) it converts views correctly', assert => {
  assert.truthy(convert('app/view_1'))
})

test('(convert) it converts modules with functions after the return correctly', assert => {
  assert.truthy(convert('app/view_2'))
})

test('(convert) it converts modules with constructors assigned to variables correctly', assert => {
  assert.truthy(convert('app/view_3'))
})

test('(convert) it handles a var declaration which is moved to a separate line', assert => {
  assert.truthy(convert('app/view_4'))
})

test('(convert) it drops an empty define', assert => {
  assert.truthy(convert('app/view_spec_1'))
})

test('(convert) it converts subapps correctly', assert => {
  assert.truthy(convert('app/subapp_1'))
})

test('(convert) it converts subapp specs correctly', assert => {
  assert.truthy(convert('app/subapp_spec_1', { quotes: 'double' }))
})

test('(convert) it converts modules with one require sugar call expression correctly', assert => {
  assert.truthy(convert('app/module_1'))
})

test('(convert) it converts modules with multiple require sugar call expressions correctly', assert => {
  assert.truthy(convert('app/module_2'))
})

test('(convert) it converts module specs correctly', assert => {
  assert.truthy(convert('app/module_spec_1'))
})

test('(convert) it converts troopjs components correctly (troopjs 1)', assert => {
  assert.truthy(convert('web-examples/troopjs_component_1'))
})

test('(convert) it converts troopjs components correctly (troopjs 2)', assert => {
  assert.truthy(convert('web-examples/troopjs_component_2'))
})

test('(convert) it converts require sugar correctly', assert => {
  assert.truthy(convert('define/require-sugar'))
})

test('(convert) it converts require sugar proxy correctly', assert => {
  assert.truthy(convert('define/require-sugar-proxy'))
})

test('(convert) it converts require sugar proxy with member expression correctly', assert => {
  assert.truthy(convert('define/require-sugar-proxy-inline'))
})

test('(convert) it converts require sugar proxy with nested member expressions correctly', assert => {
  assert.truthy(convert('define/require-sugar-proxy-inline-nested'))
})

test('(convert) it converts require sugar with side effects correctly', assert => {
  assert.truthy(convert('define/require-sugar-with-side-effect'))
})

test('(convert) it converts require with property assignment correctly', assert => {
  assert.truthy(convert('define/require-sugar-with-property-assignment'))
})

test('(convert) it converts todomvc backbone requirejs example correctly (backbone 1)', assert => {
  assert.truthy(convert('web-examples/todomvc_backbone_requirejs_1'))
})

test('(convert) it converts todomvc backbone requirejs example correctly (backbone 2)', assert => {
  assert.truthy(convert('web-examples/todomvc_backbone_requirejs_2'))
})

test('(convert) it converts todomvc backbone requirejs example correctly (backbone 3)', assert => {
  assert.truthy(convert('web-examples/todomvc_backbone_requirejs_3'))
})

test('(convert) it converts todomvc angular requirejs example correctly (angular 1)', assert => {
  assert.truthy(convert('web-examples/todomvc_angularjs_requirejs_1'))
})

test('(convert) it converts todomvc angular requirejs example correctly (angular 2)', assert => {
  assert.truthy(convert('web-examples/todomvc_angularjs_requirejs_2'))
})

test('(convert) it converts todomvc angular requirejs example correctly (angular 3)', assert => {
  assert.truthy(convert('web-examples/todomvc_angularjs_requirejs_3'))
})

test('(convert) it converts todomvc knockout requirejs example correctly', assert => {
  assert.truthy(convert('web-examples/todomvc_knockout_requirejs_1'))
})

test('(convert) it converts todomvc lavaca requirejs example correctly', assert => {
  assert.truthy(convert('web-examples/todomvc_lavaca_requirejs_1'))
})

test('(convert) it converts todomvc somajs requirejs example correctly (soma 1)', assert => {
  assert.truthy(convert('web-examples/todomvc_somajs_requirejs_1'))
})

test('(convert) it converts todomvc somajs requirejs example correctly (soma 2)', assert => {
  assert.truthy(convert('web-examples/todomvc_somajs_requirejs_2'))
})

test('(convert) it returns sourcemaps', assert => {
  assert.truthy(convertWithMap('source-maps/unnamed', { sourceMap: true }))
})

test('(convert) it handles destructuring', assert => {
  assert.truthy(convert('define/destructuring'))
})

test('(convert) it handles destructuring for multiple keys', assert => {
  assert.truthy(convert('define/destructuring-multiple-keys'))
})

test('(convert) it handles destructuring for named keys', assert => {
  assert.truthy(convert('define/destructuring-named-keys'))
})

test('(convert) it handles destructuring for require sugar', assert => {
  assert.truthy(convert('define/require-sugar-destructuring'))
})

test('(convert) it handles destructuring for require sugar with many variables', assert => {
  assert.truthy(convert('define/require-sugar-destructuring-many-variables'))
})

test('(convert) it works for simplified commonjs wrapping', assert => {
  assert.truthy(convert('amdjs-api/simplified-commonjs-wrapping'))
})

test('(convert) it works for simplified commonjs wrapping that returns a literal', assert => {
  assert.truthy(convert('amdjs-api/simplified-commonjs-wrapping-returns-literal'))
})

test('(convert) it works for named simplified commonjs wrapping', assert => {
  assert.truthy(convert('amdjs-api/named-simplified-commonjs-wrapping'))
})

test('(convert) it works for named simplified commonjs wrapping with sugar', assert => {
  assert.truthy(convert('amdjs-api/named-simplified-commonjs-wrapping-with-sugar'))
})

test('(convert) it works for named simplified commonjs wrapping with sugar (2)', assert => {
  assert.truthy(convert('amdjs-api/named-simplified-commonjs-wrapping-with-sugar-second'))
})

test('(convert) it handles anonymous imports', assert => {
  assert.truthy(convert('define/imports-anonymous'))
})

test('(convert) it converts exports.default correctly', assert => {
  assert.truthy(convert('define/exports-default'))
})

test('(convert) it removes code that defines the __esModule property', assert => {
  assert.truthy(convert('define/exports-object-define-property'))
})

test('(convert) it does not remove code that defines other properties', assert => {
  assert.truthy(convert('define/exports-object-define-property-keep'))
})

test('(convert) it handles multiple exports assignments to undefined', assert => {
  assert.truthy(convert('define/exports-overrides'))
})

test('(convert) it handles exports with same names', assert => {
  assert.truthy(convert('define/exports-same'))
})

test('(convert) it handles multiple exports assignments', assert => {
  assert.truthy(convert('define/exports-multiple'))
})

test('(convert) it handles exports with condition', assert => {
  assert.truthy(convert('define/exports-with-condition'))
})

test('(convert) it handles exports with condition and multiple overrides', assert => {
  assert.truthy(convert('define/exports-with-condition-and-overrides'))
})

test('(convert) it works for multiple returns', assert => {
  assert.truthy(convert('define/multiple-returns'))
})

test('(convert) it is a noop for files with dynamic imports', assert => {
  assert.truthy(convert('noop/dynamic-import'))
})

test('(convert) it does not break on files with dynamic import', assert => {
  assert.truthy(convert('define/dynamic-import'))
})

test('(convert) it does not break on files with async await', assert => {
  assert.truthy(convert('define/async-await'))
})

test('(convert) it does not create multiple default exports', assert => {
  assert.truthy(convert('define/if-statement-and-exports-default'))
})

test.skip('it leaves single line comments if required', assert => {
  assert.truthy(convert('define/single-line-comments', { comments: true }))
})

test.skip('it leaves multi line comments if required', assert => {
  assert.truthy(convert('define/multi-line-comments', { comments: true }))
})

test.skip('it leaves single line comments in code if required', assert => {
  assert.truthy(convert('define/comments', { comments: true }))
})

test.skip('it handles jsx', assert => {
  assert.truthy(convert('jsx/react', { jsx: true }))
})
