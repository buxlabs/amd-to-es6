"use strict";

const isDefineWithCallback = require("./isDefineWithCallback");
const isDefineWithArrayAndCallback = require("./isDefineWithArrayAndCallback");

module.exports = function (node) {
    return isDefineWithCallback(node) ||
        isDefineWithArrayAndCallback(node);
};
