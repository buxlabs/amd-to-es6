#!/usr/bin/env node
const program = require("commander");
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const amdtoes6 = require("../index");

program
    .option("-s, --src <dirname>", "Directory of the source files")
    .option("-d, --dest <dirname>", "Directory of the destination files")
    .option("-g, --glob [glob]", "Glob pattern for the src")
    .option("-r, --recursive", "Set glob pattern to **/*.js with no hassle")
    .option("-b, --beautify", "Beautify the output")
    .option("--replace", "Replace the input files with results")
    .option("--suffix <string>", "Replace suffix of the files")
    .option("--side", "Import side effects with camel cased named")
    .option("--assigned", "Automatically assign custom name to side effects")
    .option("--quotes <type>", "Single, double or auto quotes in the output", /^(single|double|auto)$/i, "single")
    .parse(process.argv);

function replaceSuffix (filename, suffix) {
    return suffix ? filename.replace(/\.js$/, "." + suffix) : filename;
}

function getGlob (options) {
    if (options.recursive) {
        return "**/*.js";
    }
    return program.glob || "*.js";
}

function convertFile (file, options) {
    var filepath = path.join(process.cwd(), file);
    var content = fs.readFileSync(filepath, "utf8");
    var compiled = amdtoes6(content, options);
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

function convertFiles (files, options) {
    files.forEach(function (file) {
        var filepath = path.join(program.src, file);
        var content = fs.readFileSync(filepath, "utf8");
        var compiled = amdtoes6(content, options);
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
    convertFile(file, program);
    process.exit(0);
}

if (program.src && (program.dest || program.replace)) {
    var files = glob.sync(getGlob(program), { cwd: program.src });
    convertFiles(files, program);
    process.exit(0);
}

process.stderr.write("Please provide --src and --dest");
process.exit(1);
