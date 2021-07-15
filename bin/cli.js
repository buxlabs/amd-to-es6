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

const settings = program.opts()

function replaceSuffix (filename, suffix) {
  return suffix ? filename.replace(/\.js$/, '.' + suffix) : filename
}

function getGlob (options) {
  if (options.recursive) {
    return '**/*.js'
  }
  return settings.glob || '*.js'
}

function convertFile (file, options) {
  const filepath = path.join(process.cwd(), file)
  const content = fs.readFileSync(filepath, 'utf8')
  const compiled = amdtoes6(content, options)
  if (options.replace) {
    const destpath = replaceSuffix(filepath, options.suffix)
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
    const filepath = path.join(options.src, file)
    const content = fs.readFileSync(filepath, 'utf8')
    const compiled = amdtoes6(content, options)
    let destpath = options.replace ? filepath : path.join(options.dest, file)
    if (options.suffix) {
      fs.unlinkSync(filepath)
    }
    destpath = replaceSuffix(destpath, options.suffix)
    fs.writeFileSync(destpath, compiled)
  })
}

if (!settings.src) {
  const file = program.args[0]
  convertFile(file, settings)
  process.exit(0)
}

if (settings.dest) {
  mkdirp.sync(settings.dest)
}

if (settings.src && (settings.dest || settings.replace)) {
  const files = glob.sync(getGlob(settings), { cwd: settings.src })
  convertFiles(files, settings)
  process.exit(0)
}

process.stderr.write('Please provide --src and --dest')
process.exit(1)
