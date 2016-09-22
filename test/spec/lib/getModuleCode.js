"use strict";

const tap = require("tap");
const escodegen = require("escodegen");
const getModuleCode = require("../../../src/lib/getModuleCode");

tap.test("it should be available", function (t) {
    t.assert(typeof getModuleCode === "function");
    t.end();
});

tap.test("getModuleCode should work for one dependency", function (t) {

    var source = `define(["core/view"], function (View) { return View.extend({}); });`;
    var code = getModuleCode(source);
    t.assert(code[0].type === "ReturnStatement");
    t.end();

});