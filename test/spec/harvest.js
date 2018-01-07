import test from 'ava'
import { harvest } from '../helper/spec'

test('it works for an anonymous module', assert => {
  assert.truthy(harvest('amdjs-api/anonymous-module'))
})

test('it works for a dependency free module', assert => {
  assert.truthy(harvest('amdjs-api/dependency-free-module'))
})

test('it works for simplified commonjs wrapping', assert => {
  assert.truthy(harvest('amdjs-api/simplified-commonjs-wrapping'))
})

test('it works for simplified commonjs wrapping that returns a literal', assert => {
  assert.truthy(harvest('amdjs-api/simplified-commonjs-wrapping-returns-literal'))
})

test('it works for named simplified commonjs wrapping', assert => {
  assert.truthy(harvest('amdjs-api/named-simplified-commonjs-wrapping'))
})

test('it works for named simplified commonjs wrapping with sugar', assert => {
  assert.truthy(harvest('amdjs-api/named-simplified-commonjs-wrapping-with-sugar'))
})

test('it works for named simplified commonjs wrapping with sugar', assert => {
  assert.truthy(harvest('amdjs-api/named-simplified-commonjs-wrapping-with-sugar-second'))
})

test('it works for named module', assert => {
  assert.truthy(harvest('amdjs-api/named-module'))
})

test('it works for named module with arrow function', assert => {
  assert.truthy(harvest('amdjs-api/named-module-arrow-fn'))
})

test('it works for an anonymous module', assert => {
  assert.truthy(harvest('rjs-examples/simple-define'))
})

test('it works for named dependencies', assert => {
  assert.truthy(harvest('rjs-examples/function-wrapping'))
})

test('it converts empty array in define correctly', assert => {
  assert.truthy(harvest('define/callback-empty-array'))
})

test('it converts empty array in define with array function correctly', assert => {
  assert.truthy(harvest('define/arrow-function-callback-empty-array'))
})

test('it converts define with callback only correctly using the built in parser', assert => {
  assert.truthy(harvest('define/callback-only'))
})

test('it converts empty define with arrow function correctly', assert => {
  assert.truthy(harvest('define/arrow-function-callback-only'))
})

test('it converts define with deps correctly', assert => {
  assert.truthy(harvest('define/arrow-function-callback-with-deps'))
})

test('it converts define with arrow function with immediate return', assert => {
  assert.truthy(harvest('define/arrow-function-immediate-return'))
})

test('it converts define with arrow function with immediate function return', assert => {
  assert.truthy(harvest('define/arrow-function-immediate-return-function'))
})

test('it converts define with deps with arrow function correctly', assert => {
  assert.truthy(harvest('define/callback-with-deps'))
})

test('it converts modules wrapped with iife correctly', assert => {
  assert.truthy(harvest('define/iife'))
})

test('it converts quotes correctly', assert => {
  assert.truthy(harvest('define/quotes'))
})

test('it converts define with an object in callback only correctly', assert => {
  assert.truthy(harvest('define/object-only'))
})

test("it shouldn't convert files with no define", assert => {
  assert.truthy(harvest('define/no-define'))
})

test('it leaves single line comments if required', assert => {
  assert.truthy(harvest('define/single-line-comments', { comments: true }))
})

test('it leaves multi line comments if required', assert => {
  assert.truthy(harvest('define/multi-line-comments', { comments: true }))
})

test('it leaves single line comments in code if required', assert => {
  assert.truthy(harvest('define/comments', { comments: true }))
})

test('it converts define with unused deps correctly', assert => {
  assert.truthy(harvest('define/callback-with-mismatch-deps'))
})

test('it keeps dependencies with side effects', assert => {
  assert.truthy(harvest('app/behavior_1'))
})

test('it keeps dependencies with side effects', assert => {
  assert.truthy(harvest('app/behavior_2'))
})

test('it converts controllers correctly', assert => {
  assert.truthy(harvest('app/controller_1'))
})

test('it keeps dependencies with side effects', assert => {
  assert.truthy(harvest('app/controller_2'))
})

test('it works with const', assert => {
  assert.truthy(harvest('app/controller_3'))
})

test('it works with let', assert => {
  assert.truthy(harvest('app/controller_4'))
})

test('it keeps custom object assignments', assert => {
  assert.truthy(harvest('app/enum_1'))
})

test('it leaves empty var statements', assert => {
  assert.truthy(harvest('app/helper_1'))
})

test('it leaves empty var statements', assert => {
  assert.truthy(harvest('app/helper_2'))
})

test('it works for named dependencies', assert => {
  assert.truthy(harvest('app/helper_3'))
})

test('it leaves empty var statements', assert => {
  assert.truthy(harvest('app/model_1'))
})

test('it handles returns of objects', assert => {
  assert.truthy(harvest('app/model_2'))
})

test('it converts views correctly', assert => {
  assert.truthy(harvest('app/view_1'))
})

test('it converts modules with functions after the return correctly', assert => {
  assert.truthy(harvest('app/view_2'))
})

test('it converts modules with constructors assigned to variables correctly', assert => {
  assert.truthy(harvest('app/view_3'))
})

test('it handles a var declaration which is moved to a separate line', assert => {
  assert.truthy(harvest('app/view_4'))
})

test('it drops an empty define', assert => {
  assert.truthy(harvest('app/view_spec_1'))
})

test('it converts subapps correctly', assert => {
  assert.truthy(harvest('app/subapp_1'))
})

test('it converts subapp specs correctly', assert => {
  assert.truthy(harvest('app/subapp_spec_1', { quotes: 'double' }))
})

test('it converts modules with one require sugar call expression correctly', assert => {
  assert.truthy(harvest('app/module_1'))
})

test('it converts modules with multiple require sugar call expressions correctly', assert => {
  assert.truthy(harvest('app/module_2'))
})

test('it converts module specs correctly', assert => {
  assert.truthy(harvest('app/module_spec_1'))
})

test('it converts troopjs components correctly', assert => {
  assert.truthy(harvest('web-examples/troopjs_component_1'))
})

test('it converts troopjs components correctly', assert => {
  assert.truthy(harvest('web-examples/troopjs_component_2'))
})

test('it converts require sugar correctly', assert => {
  assert.truthy(harvest('define/require-sugar'))
})

test('it converts require sugar with side effects correctly', assert => {
  assert.truthy(harvest('define/require-sugar-with-side-effect'))
})

test('it converts require with property assignment correctly', assert => {
  assert.truthy(harvest('define/require-sugar-with-property-assignment'))
})

test('it converts todomvc backbone requirejs example correctly', assert => {
  assert.truthy(harvest('web-examples/todomvc_backbone_requirejs_1'))
})

test('it converts todomvc backbone requirejs example correctly', assert => {
  assert.truthy(harvest('web-examples/todomvc_backbone_requirejs_2'))
})

test('it converts todomvc backbone requirejs example correctly', assert => {
  assert.truthy(harvest('web-examples/todomvc_backbone_requirejs_3'))
})

test('it converts todomvc angular requirejs example correctly', assert => {
  assert.truthy(harvest('web-examples/todomvc_angularjs_requirejs_1'))
})

test('it converts todomvc angular requirejs example correctly', assert => {
  assert.truthy(harvest('web-examples/todomvc_angularjs_requirejs_2'))
})

test('it converts todomvc angular requirejs example correctly', assert => {
  assert.truthy(harvest('web-examples/todomvc_angularjs_requirejs_3'))
})

test('it converts todomvc knockout requirejs example correctly', assert => {
  assert.truthy(harvest('web-examples/todomvc_knockout_requirejs_1'))
})

test('it converts todomvc lavaca requirejs example correctly', assert => {
  assert.truthy(harvest('web-examples/todomvc_lavaca_requirejs_1'))
})

test('it converts todomvc somajs requirejs example correctly', assert => {
  assert.truthy(harvest('web-examples/todomvc_somajs_requirejs_1'))
})

test('it converts todomvc somajs requirejs example correctly', assert => {
  assert.truthy(harvest('web-examples/todomvc_somajs_requirejs_2'))
})

test('it converts exports.default correctly', assert => {
  assert.truthy(harvest('define/exports-default'))
})

test('it removes code that defines the __esModule property', assert => {
  assert.truthy(harvest('define/object-define-property'))
})

test('it handles multiple exports assignments to undefined', assert => {
  assert.truthy(harvest('define/exports-overrides'))
})

test('it handles anonymous imports', assert => {
  assert.truthy(harvest('define/imports-anonymous'))
})

test('it handles destructuring', assert => {
  assert.truthy(harvest('define/destructuring'))
})

test('it handles destructuring for multiple keys', assert => {
  assert.truthy(harvest('define/destructuring-multiple-keys'))
})

test('it handles destructuring for named keys', assert => {
  assert.truthy(harvest('define/destructuring-named-keys'))
})

test('it handles destructuring for require sugar', assert => {
  assert.truthy(harvest('define/require-sugar-destructuring'))
})

test('it handles destructuring for require sugar with many variables', assert => {
  assert.truthy(harvest('define/require-sugar-destructuring-many-variables'))
})

test.skip('it handles multiple exports assignments', assert => {
  assert.truthy(harvest('define/exports-multiple'))
})

test.skip('it handles exports with same names', assert => {
  assert.truthy(harvest('define/exports-same'))
})
