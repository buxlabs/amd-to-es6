const acorn = require("acorn");
const walk = require("acorn/dist/walk");
const escodegen = require("escodegen");

module.exports = function (source, options) {
    var ast = acorn.parse(source);
    return escodegen.generate(ast);
};

