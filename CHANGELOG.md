# @buxlabs/amd-to-es6 changelog

## 0.16.2
* edit: update dependencies

## 0.16.1
* edit: update dependencies

## 0.16.0
* edit: update dependencies

## 0.15.2
* edit: update .npmignore

## 0.15.1
* edit: update dependencies

## 0.13.3
* edit: update dependencies

## 0.13.2
* add: support async/await

## 0.13.1
* remove: .nyc_output from the package source files

## 0.13.0
* add: support dynamic imports inside of the source code
* edit: update dependencies
* remove: comments support

## 0.12.5
* fix: added .npmignore

## 0.12.4
* fix: handle multiple returns

## 0.12.3
* fix: handle code with complex exports assignments

## 0.12.2
* update: dependencies

## 0.12.1
* fix: support node >= 4.0.0

## 0.12.0
* add: support multi exports
* fix: handle collisions of names
* remove: drop support for side and assigned flags

## 0.11.3
* add: better support for destructuring with require sugar

## 0.11.2
* add: basics for destructuring support in define

## 0.11.1
* fix: handle multiple exports.foo assignments
* add: new skipped test cases that were not considered before

## 0.11.0
* edit: return { source, map } instead of { code, map } in the toSource method
* fix: handle exports.default as export default

## 0.10.0
* add: sourcemaps support

## 0.9.2
* fix: create destination dir for convenience if it doesn't exist already

## 0.9.1
* edit: use standardjs as a styleguide

## 0.9.0
* add: better support for comments (ast is using espree instead of acorn)

## 0.8.4
* fix: support named define with callback

## 0.8.3
* add: minor performance improvement for non amd files

## 0.8.0
* edit: performance improvements, code cleanup

## 0.7.10
* edit: force lf in .gitattributes

## 0.7.9
* add: support inline require in a member expression

## 0.7.8
* edit: switch to @buxlabs/amd-to-es6 name

## 0.7.7
* edit: introduce Module class

## 0.7.6
* edit: refactor specs to ava

## 0.7.5
* add: docs

## 0.7.4
* fix: versioning

## 0.7.3
* add: basic comments support

## 0.7.2
* fix: crlf issue

## 0.7.0
* add: support simplified commonjs wrapping with suggar

## 0.6.4
* update: performance improvements

## 0.6.3
* add: support for different types of quotes in output

## 0.6.2
* add: support for short command line options

## 0.6.1
* add: support for side effects with names and custom assigned name

## 0.6.0
* add: basic support for simplified commonjs wrapping

## 0.5.5
* add: check if the module has define

## 0.5.4
* add: const/let support for require sugar

## 0.5.3
* add: --recursive flag

## 0.5.2
* add: --beautify flag

## 0.5.1
* add: named define support

## 0.5.0
* add: import with side-effects

## 0.4.0
* add: simple key/value define support
