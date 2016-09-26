"use strict";

const tap = require("tap");
const fs = require("fs");
const shell = require("shelljs");
const path = require("path");

tap.test("it should be possible to convert files through cli", function (t) {

    var bin = path.join(__dirname, "../../../bin/cli.js");
    var input = "../test/fixture/cli/input.js";
    var output = fs.readFileSync(path.join(__dirname, "../../fixture/cli/output.js"), "utf8");
    var result = shell.exec(`node ${bin} ${input}`, { silent: true });
    t.ok(output === result.stdout);
    t.end();

});
