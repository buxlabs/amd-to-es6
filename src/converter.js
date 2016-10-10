"use strict";

const escodegen = require("escodegen");
const acorn = require("acorn");
const beautify = require("js-beautify").js_beautify;
const hasDefine = require("./lib/hasDefine");
const getDependencies = require("./lib/getDependencies");
const getModuleCode = require("./lib/getModuleCode");
const generateImports = require("./lib/generateImports");
const generateCode = require("./lib/generateCode");
const attachComments = require("./lib/attachComments");

module.exports = function (source, options) {
    options = options || {};
    // this could be optimized, the source is parsed in 3 places
    // an ast tree could be passed instead to the methods
    if (!hasDefine(source)) {
        return source;
    }
    var comments = [];
    var tokens = [];
    var ast = acorn.parse(source, {
        ranges: true,
        onComment: comments,
        onToken: tokens
    });
    var dependencies = getDependencies(ast);
    var nodes = getModuleCode(ast);
    var imports = generateImports(dependencies, options);
    var code = generateCode(ast, nodes, options);
    var program = { type: "Program", body: imports.concat(code) };
    var result = escodegen.generate(program, {
        format: {
            quotes: options.quotes
        }
    });
    if (options.comments) {
        result = attachComments(result, comments);
    }
    if (options.beautify) {
        return beautify(result, {
            end_with_newline: true
        });
    }
    return result;
};
