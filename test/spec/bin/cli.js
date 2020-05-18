const test = require('ava')
const fs = require('fs')
const shell = require('shelljs')
const path = require('path')
const os = require('os')

const bin = path.join(__dirname, '../../../bin/cli.js')

function compare (result, output) {
  return result.replace(/\s+/g, '') === output.replace(/\s+/g, '')
}

test('allows to convert a file through cli', t => {
  var args = 'test/fixture/cli/single-file/input.js'
  var output = fs.readFileSync(path.join(__dirname, '../../fixture/cli/single-file/output.js'), 'utf8')
  var result = shell.exec(`node ${bin} ${args}`, { silent: true })
  t.truthy(compare(output, result.stdout))
})

test('allows to convert multiple files within a directory', t => {
  var src = 'test/fixture/cli/multiple-files/inputs'
  var glob = '*.js'
  var dest = 'test/fixture/cli/multiple-files/outputs'
  var args = `--src=${src} --glob=${glob} --dest=${dest}`
  shell.exec(`node ${bin} ${args}`, { silent: true })
  var input1 = path.join(__dirname, '../../../', dest, 'input1.js')
  var input2 = path.join(__dirname, '../../../', dest, 'input2.js')
  var output1 = path.join(__dirname, '../../../', dest, 'output1.js')
  var output2 = path.join(__dirname, '../../../', dest, 'output2.js')
  var content1 = fs.readFileSync(input1, 'utf8')
  var content2 = fs.readFileSync(input2, 'utf8')
  var result1 = fs.readFileSync(output1, 'utf8')
  var result2 = fs.readFileSync(output2, 'utf8')
  t.truthy(compare(content1, result1))
  t.truthy(compare(content2, result2))
  fs.unlinkSync(input1)
  fs.unlinkSync(input2)
})

test('allows to convert multiple files recursively into an unexisting dir', t => {
  const tmp = os.tmpdir()
  const src = 'test/fixture/cli/multiple-files/inputs'
  const glob = '*.js'
  const dest = path.join(tmp, 'amd-to-es6-test1')
  const args = `--src=${src} --glob=${glob} --dest=${dest}`
  shell.exec(`node ${bin} ${args}`)
  const output = path.join(dest, 'input1.js')
  const result = fs.readFileSync(output, 'utf8')
  t.truthy(result)
  shell.exec(`rm -rf ${dest}`)
})

test('allows to convert multiple files recursively using the glob option', t => {
  var src = 'test/fixture/cli/multiple-files-recursive/inputs'
  var glob = '**/*.js'
  var dest = 'test/fixture/cli/multiple-files-recursive/outputs'
  var args = `--src=${src} --glob=${glob} --dest=${dest}`
  shell.exec(`node ${bin} ${args}`, { silent: true })
  var input1 = path.join(__dirname, '../../../', dest, 'input1.js')
  var input2 = path.join(__dirname, '../../../', dest, 'dir/input2.js')
  var output1 = path.join(__dirname, '../../../', dest, 'output1.js')
  var output2 = path.join(__dirname, '../../../', dest, 'dir/output2.js')
  var content1 = fs.readFileSync(input1, 'utf8')
  var content2 = fs.readFileSync(input2, 'utf8')
  var result1 = fs.readFileSync(output1, 'utf8')
  var result2 = fs.readFileSync(output2, 'utf8')
  t.truthy(compare(content1, result1))
  t.truthy(compare(content2, result2))
  fs.unlinkSync(input1)
  fs.unlinkSync(input2)
})

test('allows to convert multiple files recursively using the recursive option', t => {
  var src = 'test/fixture/cli/multiple-files-recursive/inputs'
  var dest = 'test/fixture/cli/multiple-files-recursive/outputs'
  var args = `--src=${src} --dest=${dest} --recursive`
  shell.exec(`node ${bin} ${args}`, { silent: true })
  var input1 = path.join(__dirname, '../../../', dest, 'input1.js')
  var input2 = path.join(__dirname, '../../../', dest, 'dir/input2.js')
  var output1 = path.join(__dirname, '../../../', dest, 'output1.js')
  var output2 = path.join(__dirname, '../../../', dest, 'dir/output2.js')
  var content1 = fs.readFileSync(input1, 'utf8')
  var content2 = fs.readFileSync(input2, 'utf8')
  var result1 = fs.readFileSync(output1, 'utf8')
  var result2 = fs.readFileSync(output2, 'utf8')
  t.truthy(compare(content1, result1))
  t.truthy(compare(content2, result2))
  fs.unlinkSync(input1)
  fs.unlinkSync(input2)
})

test('allows to replace given file with a compiled one', t => {
  var content = 'define(function () { return 123; });'
  var src = 'test/fixture/cli/input.js'
  var filepath = path.join(__dirname, '../../../', src)
  fs.writeFileSync(filepath, content)
  shell.exec(`node ${bin} ${src} --replace`, { silent: true })
  var output = fs.readFileSync(filepath, 'utf8')
  t.truthy(compare(output, 'export default 123;'))
  fs.unlinkSync(filepath)
})

test('allows to replace given files within a directory', t => {
  var dir = 'test/fixture/cli/replace-files'
  var dirpath = path.join(__dirname, '../../../', dir)
  fs.mkdirSync(dirpath)
  var content = 'define(function () { return 712; });'
  var src = 'test/fixture/cli/replace-files/input.js'
  var filepath = path.join(__dirname, '../../../', src)
  fs.writeFileSync(filepath, content)
  var result = shell.exec(`node ${bin} --src=${dirpath} --replace`, { silent: true })
  var output = fs.readFileSync(filepath, 'utf8')
  t.truthy(result.code === 0)
  t.truthy(compare(output, 'export default 712;'))
  fs.unlinkSync(filepath)
  fs.rmdirSync(dirpath)
})

test.skip("allows to convert a single file and change it's suffix", t => {
  var src = 'test/fixture/cli/input-replace-suffix/input.js'
  var filepath = path.join(__dirname, '../../../', src)
  var result = shell.exec(`node ${bin} ${src} --replace --suffix=es6`, { silent: true })
  var destpath = filepath.replace(/\.js$/, '.es6')
  var output = fs.readFileSync(destpath, 'utf8')
  fs.unlinkSync(destpath)
  fs.writeFileSync(filepath, 'define(function () { return 142; });')
  t.truthy(result.code === 0)
  t.truthy(compare(output, 'export default 142;'))
})

test.skip('allows to convert multiple files and change their suffix', t => {
  var dir = 'test/fixture/cli/replace-suffix-files'
  var dirpath = path.join(__dirname, '../../../', dir)
  var src = 'test/fixture/cli/replace-suffix-files/input.js'
  var filepath = path.join(__dirname, '../../../', src)
  var result = shell.exec(`node ${bin} --src=${dirpath} --replace --suffix=es6`, { silent: true })
  var destpath = filepath.replace(/\.js$/, '.es6')
  var output = fs.readFileSync(destpath, 'utf8')
  fs.writeFileSync(filepath, 'define(function () { return 617; });')
  t.truthy(result.code === 0)
  t.truthy(compare(output, 'export default 617;'))
  fs.unlinkSync(destpath)
})

test('allows to beautify the output', t => {
  function replaceNewlines (str) {
    return str.replace(/(\W)/g, '')
  }
  var args = 'test/fixture/cli/beautify-file/input.js'
  var output = fs.readFileSync(path.join(__dirname, '../../fixture/cli/beautify-file/output.js'), 'utf8')
  var result = shell.exec(`node ${bin} --beautify ${args}`, { silent: true })
  t.truthy(replaceNewlines(output) === replaceNewlines(result.stdout))
})

test('allows to generate code with double quotes', t => {
  var args = 'test/fixture/cli/double-quotes/input.js'
  var output = fs.readFileSync(path.join(__dirname, '../../fixture/cli/double-quotes/output.js'), 'utf8')
  var result = shell.exec(`node ${bin} --quotes=double ${args}`, { silent: true })
  t.truthy(compare(output, result.stdout))
})

test('throws an error if dest is not provided', t => {
  var result = shell.exec(`node ${bin} --src=hello`, { silent: true })
  t.truthy(result.code === 1)
})
