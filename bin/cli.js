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
    .parse(process.argv);


if (!program.src) {
    var file = program.args[0];
    var filepath = path.join(process.cwd(), file);
    var content = fs.readFileSync(filepath, "utf8");
    var compiled = amdtoes6(content);
    process.stdout.write(compiled);
    return process.exit(0);
}

if (program.src && program.dest) {
    var files = glob.sync(program.glob, { cwd: program.src });
    files.forEach(function (file) {
        var filepath = path.join(program.src, file);
        var content = fs.readFileSync(filepath, "utf8");
        var compiled = amdtoes6(content);
        var destpath = path.join(program.dest, file);
        fs.writeFileSync(destpath, compiled);
    });
    return process.exit(0);
}

process.stderr.write("Please provide --src and --dest");
return process.exit(1);
