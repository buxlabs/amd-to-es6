"use strict";

const tap = require("tap");
const fs = require("fs");
const path = require("path");
const converter = require("../../index");

function compare (result, output) {
    return result.replace(/\s+/g, "") === output.replace(/\s+/g, "");
}

function test (dir) {
    const file1 = path.join(__dirname, "../fixture/", dir, "/input.js");
    const file2 = path.join(__dirname, "../fixture/", dir, "/output.js");
    const input = fs.readFileSync(file1, "utf8");
    const output = fs.readFileSync(file2, "utf8");
    const result = converter(input);
    return compare(result, output);
}

tap.test("the converter should be available", (t) => {
    t.assert(typeof converter === "function");
    t.end();
});

tap.test("it should work for an anonymous module", (t) => {
    t.assert(test("amdjs-api/anonymous-module"));
    t.end();
});

tap.test("it should work for a dependency free module", (t) => {
    t.assert(test("amdjs-api/dependency-free-module"));
    t.end();
});

tap.test("it should work for an anonymous module", (t) => {
    t.assert(test("rjs-examples/simple-define"));
    t.end();
});

tap.test("it should work for named dependencies", (t) => {
    t.assert(test("rjs-examples/function-wrapping"));
    t.end();
});

tap.test("it should convert empty array in define correctly", (t) => {
    t.assert(test("define-callback-empty-array"));
    t.end();
});

tap.test("it should convert empty array in define with array function correctly", (t) => {
    t.assert(test("define-arrow-function-callback-empty-array"));
    t.end();
});

tap.test("it should convert define with callback only correctly using the built in parser", (t) => {
    t.assert(test("define-callback-only"));
    t.end();
});

tap.test("it should convert empty define with arrow function correctly", (t) => {
    t.assert(test("define-arrow-function-callback-only"));
    t.end();
});

tap.test("it should convert define with deps correctly", (t) => {
    t.assert(test("define-arrow-function-callback-with-deps"));
    t.end();
});

tap.test("it should convert define with deps with arrow function correctly", (t) => {
    t.assert(test("define-callback-with-deps"));
    t.end();
});

tap.test("it should convert define with an object in callback only correctly", (t) => {
    t.assert(test("define-object-only"));
    t.end();
});

tap.test("it should convert define with unused deps correctly", (t) => {
    t.assert(test("define-callback-with-mismatch-deps"));
    t.end();
});

tap.test("it should keep dependencies with side effects", (t) => {
    t.assert(test("app/behavior_1"));
    t.end();
});

tap.test("it should keep dependencies with side effects", (t) => {
    t.assert(test("app/behavior_2"));
    t.end();
});

tap.test("it should convert controllers correctly", (t) => {
    t.assert(test("app/controller_1"));
    t.end();
});

tap.test("it should keep dependencies with side effects", (t) => {
    t.assert(test("app/controller_2"));
    t.end();
});

tap.test("it should work with const", (t) => {
    t.assert(test("app/controller_3"));
    t.end();
});

tap.test("it should work with let", (t) => {
    t.assert(test("app/controller_4"));
    t.end();
});

tap.test("it should keep custom object assignments", (t) => {
    t.assert(test("app/enum_1"));
    t.end();
});

tap.test("it should leave empty var statements", (t) => {
    t.assert(test("app/helper_1"));
    t.end();
});

tap.test("it should leave empty var statements", (t) => {
    t.assert(test("app/helper_2"));
    t.end();
});

tap.test("it should work for named dependencies", (t) => {
    t.assert(test("app/helper_3"));
    t.end();
});

tap.test("it should leave empty var statements", (t) => {
    t.assert(test("app/model_1"));
    t.end();
});

tap.test("it should handle returns of objects", (t) => {
    t.assert(test("app/model_2"));
    t.end();
});

tap.test("it should convert views correctly", (t) => {
    t.assert(test("app/view_1"));
    t.end();
});

tap.test("it should convert modules with functions after the return correctly", (t) => {
    t.assert(test("app/view_2"));
    t.end();
});

tap.test("it should convert modules with constructors assigned to variables correctly", (t) => {
    t.assert(test("app/view_3"));
    t.end();
});

tap.test("it should handle a var declaration which is moved to a separate line", (t) => {
    t.assert(test("app/view_4"));
    t.end();
});

tap.test("it should drop an empty define", (t) => {
    t.assert(test("app/view_spec_1"));
    t.end();
});

tap.test("it should convert subapps correctly", (t) => {
    t.assert(test("app/subapp_1"));
    t.end();
});

tap.test("it should covert subapp specs correctly", (t) => {
    t.assert(test("app/subapp_spec_1"));
    t.end();
});

tap.test("it should convert modules with one require sugar call expression correctly", (t) => {
    t.assert(test("app/module_1"));
    t.end();
});

tap.test("it should convert modules with multiple require sugar call expressions correctly", (t) => {
    t.assert(test("app/module_2"));
    t.end();
});

tap.test("it should convert module specs correctly", (t) => {
    t.assert(test("app/module_spec_1"));
    t.end();
});
