#!/usr/bin/env node
const program = require("commander");
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const amdtoes6 = require("../index");

program
    .option("--src <dirname>", "Directory of the source files")
    .option("--glob [glob]", "Glob pattern for the src")
    .option("--dest <dirname>", "Directory of the destination files")
    .option("--replace", "Replace the input files with results")
    .option("--suffix <string>", "Replace suffix of the files")
    .parse(process.argv);

function replaceSuffix (filename, suffix) {
    return suffix ? filename.replace(/\.js$/, "." + suffix) : filename;
}

function convertFile (file) {
    var filepath = path.join(process.cwd(), file);
    var content = fs.readFileSync(filepath, "utf8");
    var compiled = amdtoes6(content);
    if (program.replace) {
        var destpath = replaceSuffix(filepath, program.suffix);
        if (program.suffix) {
            fs.unlinkSync(filepath);
        }
        fs.writeFileSync(destpath, compiled);
    } else {
        process.stdout.write(compiled);
    }
}

function convertFiles (files) {
    files.forEach(function (file) {
        var filepath = path.join(program.src, file);
        var content = fs.readFileSync(filepath, "utf8");
        var compiled = amdtoes6(content);
        var destpath = program.replace ? filepath : path.join(program.dest, file);
        if (program.suffix) {
            fs.unlinkSync(filepath);
        }
        destpath = replaceSuffix(destpath, program.suffix);
        fs.writeFileSync(destpath, compiled);
    });
}

if (!program.src) {
    var file = program.args[0];
    convertFile(file);
    return process.exit(0);
}

if (program.src && (program.dest || program.replace)) {
    var files = glob.sync(program.glob || "*.js", { cwd: program.src });
    convertFiles(files);
    return process.exit(0);
}

process.stderr.write("Please provide --src and --dest");
return process.exit(1);
