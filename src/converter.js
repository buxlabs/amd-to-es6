"use strict";

const escodegen = require("escodegen");
const getDependencies = require("./lib/getDependencies");
const getModuleCode = require("./lib/getModuleCode");
const generateImports = require("./lib/generateImports");
const generateCode = require("./lib/generateCode");

module.exports = function (source, options) {
    // this could be optimized, the source is parsed in 3 places
    // an ast tree could be passed instead to the methods
    var dependencies = getDependencies(source);
    var code = getModuleCode(source);
    var imports = generateImports(dependencies);
    code = generateCode(source, code);
    var program = { type: "Program", body: imports.concat(code) };
    return escodegen.generate(program);
};
