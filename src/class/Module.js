"use strict";

const AbstractSyntaxTree = require("@buxlabs/ast");
const getDependencies = require("../lib/getDependencies");
const getModuleCode = require("../lib/getModuleCode");
const generateImports = require("../lib/generateImports");
const generateCode = require("../lib/generateCode");

class Module extends AbstractSyntaxTree {

    getDependencies () {
        return getDependencies(this.ast);
    }

    convert (options) {
        var dependencies = this.getDependencies();
        var nodes = getModuleCode(this.ast);
        var imports = generateImports(dependencies, options);
        var code = generateCode(this.ast, nodes, options);
        this.ast.body = imports.concat(code);
        this.removeUseStrict();
        
    }

    removeUseStrict () {
        this.remove({
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: "use strict"
            }
        });
    }

}

module.exports = Module;
