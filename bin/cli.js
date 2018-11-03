#!/usr/bin/env node

const program = require('commander')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const mkdirp = require('mkdirp')
const amdtoes6 = require('../index')

program
  .option('-s, --src <dirname>', 'Directory of the source files')
  .option('-d, --dest <dirname>', 'Directory of the destination files')
  .option('-g, --glob [glob]', 'Glob pattern for the src')
  .option('-r, --recursive', 'Set glob pattern to **/*.js with no hassle')
  .option('-b, --beautify', 'Beautify the output')
  .option('--replace', 'Replace the input files with results')
  .option('--suffix <string>', 'Replace suffix of the files')
  .option('--quotes <type>', 'Single, double or auto quotes in the output', /^(single|double|auto)$/i, 'single')
  .parse(process.argv)

function replaceSuffix (filename, suffix) {
  return suffix ? filename.replace(/\.js$/, '.' + suffix) : filename
}

function getGlob (options) {
  if (options.recursive) {
    return '**/*.js'
  }
  return program.glob || '*.js'
}

function convertFile (file, options) {
  var filepath = path.join(process.cwd(), file)
  var content = fs.readFileSync(filepath, 'utf8')
  var compiled = amdtoes6(content, options)
  if (options.replace) {
    var destpath = replaceSuffix(filepath, options.suffix)
    if (options.suffix) {
      fs.unlinkSync(filepath)
    }
    fs.writeFileSync(destpath, compiled)
  } else {
    process.stdout.write(compiled)
  }
}

function convertFiles (files, options) {
  files.forEach(function (file) {
    var filepath = path.join(options.src, file)
    var content = fs.readFileSync(filepath, 'utf8')
    var compiled = amdtoes6(content, options)
    var destpath = options.replace ? filepath : path.join(options.dest, file)
    if (options.suffix) {
      fs.unlinkSync(filepath)
    }
    destpath = replaceSuffix(destpath, options.suffix)
    fs.writeFileSync(destpath, compiled)
  })
}

if (!program.src) {
  var file = program.args[0]
  convertFile(file, program)
  process.exit(0)
}

if (program.dest) {
  mkdirp.sync(program.dest)
}

if (program.src && (program.dest || program.replace)) {
  var files = glob.sync(getGlob(program), { cwd: program.src })
  convertFiles(files, program)
  process.exit(0)
}

process.stderr.write('Please provide --src and --dest')
process.exit(1)
