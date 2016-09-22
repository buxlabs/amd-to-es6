"use strict";

const getImportDeclaration = require("./getImportDeclaration");

module.exports = function (dependencies) {
    return dependencies.map(function (dependency) {
        return getImportDeclaration(dependency.element, dependency.param);
    });
};
