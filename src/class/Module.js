"use strict";

const acorn = require("acorn");
const escodegen = require("escodegen");
const beautify = require("js-beautify").js_beautify;
const hasDefine = require("../lib/hasDefine");
const getDependencies = require("../lib/getDependencies");
const getModuleCode = require("../lib/getModuleCode");
const generateImports = require("../lib/generateImports");
const generateCode = require("../lib/generateCode");
const attachComments = require("../lib/attachComments");

class Module {

    constructor (source) {
        this.source = source;
        this.comments = [];
        this.tokens = [];
        this.ast = acorn.parse(source, {
            ranges: true,
            onComment: this.comments,
            onToken: this.tokens,
            sourceType: "module"
        });
    }

    parse (source) {
        this.source = source;
        this.comments = [];
        this.tokens = [];
        this.ast = acorn.parse(source, {
            ranges: true,
            onComment: this.comments,
            onToken: this.tokens,
            sourceType: "module"
        });
    }

    hasDefine () {
        return hasDefine(this.source);
    }

    getDependencies () {
        return getDependencies(this.ast);
    }

    convert (options) {
        var dependencies = this.getDependencies();
        var nodes = getModuleCode(this.ast);
        var imports = generateImports(dependencies, options);
        var code = generateCode(this.ast, nodes, options);
        var program = { type: "Program", body: imports.concat(code) };
        var source = escodegen.generate(program, {
            format: {
                quotes: options.quotes
            }
        });
        if (options.comments) {
            source = attachComments(source, this.comments);
        }
        this.parse(source);
    }

    beautify (options) {
        this.source = beautify(this.source, {
            end_with_newline: true
        });
    }

}

module.exports = Module;
