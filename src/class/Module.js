"use strict";

const AbstractSyntaxTree = require("@buxlabs/ast");
const hasDefine = require("../lib/hasDefine");
const getDependencies = require("../lib/getDependencies");
const getModuleCode = require("../lib/getModuleCode");
const generateImports = require("../lib/generateImports");
const generateCode = require("../lib/generateCode");

class Module extends AbstractSyntaxTree {

    hasDefine () {
        return hasDefine(this.ast);
    }

    getDependencies () {
        return getDependencies(this.ast);
    }

    convert (options) {
        var dependencies = this.getDependencies();
        var nodes = getModuleCode(this.ast);
        var imports = generateImports(dependencies, options);
        var code = generateCode(this.ast, nodes, options);
        this.ast.body = imports.concat(code);
        
    }

}

module.exports = Module;
