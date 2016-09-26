#!/usr/bin/env node

const program = require("commander");
const fs = require("fs");
const path = require("path");
const amdtoes6 = require("../index");

program.parse(process.argv);

var file = program.args[0];
var content = fs.readFileSync(path.join(process.cwd(), file), "utf8");
var compiled = amdtoes6(content);

process.stdout.write(compiled);
