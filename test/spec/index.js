"use strict";

const tap = require("tap");
const fs = require("fs");
const path = require("path");
const converter = require("../../index");

function compare (result, output) {
    return result.replace(/\s+/g, "") === output.replace(/\s+/g, "");
}

function test (dir, options) {
    const file1 = path.join(__dirname, "../fixture/", dir, "/input.js");
    const file2 = path.join(__dirname, "../fixture/", dir, "/output.js");
    const input = fs.readFileSync(file1, "utf8");
    const output = fs.readFileSync(file2, "utf8");
    const result = converter(input, options);
    return compare(result, output);
}

tap.test("the converter should be available", (t) => {
    t.ok(typeof converter === "function");
    t.end();
});

tap.test("it should work for an anonymous module", (t) => {
    t.ok(test("amdjs-api/anonymous-module"));
    t.end();
});

tap.test("it should work for a dependency free module", (t) => {
    t.ok(test("amdjs-api/dependency-free-module"));
    t.end();
});

tap.test("it should work for simplified commonjs wrapping", (t) => {
    t.ok(test("amdjs-api/simplified-commonjs-wrapping"));
    t.end();
});

tap.test("it should work for simplified commonjs wrapping that returns a literal", (t) => {
    t.ok(test("amdjs-api/simplified-commonjs-wrapping-returns-literal"));
    t.end();
});

tap.test("it should work for named simplified commonjs wrapping", (t) => {
    t.ok(test("amdjs-api/named-simplified-commonjs-wrapping"));
    t.end();
});

tap.test("it should work for named simplified commonjs wrapping with sugar", (t) => {
    t.ok(test("amdjs-api/named-simplified-commonjs-wrapping-with-sugar"));
    t.end();
});

tap.test("it should work for named simplified commonjs wrapping with sugar", (t) => {
    t.ok(test("amdjs-api/named-simplified-commonjs-wrapping-with-sugar-second"));
    t.end();
});

tap.test("it should work for an anonymous module", (t) => {
    t.ok(test("rjs-examples/simple-define"));
    t.end();
});

tap.test("it should work for named dependencies", (t) => {
    t.ok(test("rjs-examples/function-wrapping"));
    t.end();
});

tap.test("it should convert empty array in define correctly", (t) => {
    t.ok(test("define/callback-empty-array"));
    t.end();
});

tap.test("it should convert empty array in define with array function correctly", (t) => {
    t.ok(test("define/arrow-function-callback-empty-array"));
    t.end();
});

tap.test("it should convert define with callback only correctly using the built in parser", (t) => {
    t.ok(test("define/callback-only"));
    t.end();
});

tap.test("it should convert empty define with arrow function correctly", (t) => {
    t.ok(test("define/arrow-function-callback-only"));
    t.end();
});

tap.test("it should convert define with deps correctly", (t) => {
    t.ok(test("define/arrow-function-callback-with-deps"));
    t.end();
});

tap.test("it should convert define with deps with arrow function correctly", (t) => {
    t.ok(test("define/callback-with-deps"));
    t.end();
});

tap.test("it should convert modules wrapped with iife correctly", (t) => {
    t.ok(test("define/iife"));
    t.end();
});

tap.test("it should convert quotes correctly", (t) => {
    t.ok(test("define/quotes"));
    t.end();
});

tap.test("it should leave comments if required", (t) => {
    t.ok(test("define/comments", { comments: true }));
    t.end();
});

tap.test("it should convert define with an object in callback only correctly", (t) => {
    t.ok(test("define/object-only"));
    t.end();
});

tap.test("it should convert define with unused deps correctly", (t) => {
    t.ok(test("define/callback-with-mismatch-deps"));
    t.end();
});

tap.test("it should keep dependencies with side effects", (t) => {
    t.ok(test("app/behavior_1"));
    t.end();
});

tap.test("it should keep dependencies with side effects", (t) => {
    t.ok(test("app/behavior_2"));
    t.end();
});

tap.test("it should convert controllers correctly", (t) => {
    t.ok(test("app/controller_1"));
    t.end();
});

tap.test("it should keep dependencies with side effects", (t) => {
    t.ok(test("app/controller_2"));
    t.end();
});

tap.test("it should work with const", (t) => {
    t.ok(test("app/controller_3"));
    t.end();
});

tap.test("it should work with let", (t) => {
    t.ok(test("app/controller_4"));
    t.end();
});

tap.test("it should keep custom object assignments", (t) => {
    t.ok(test("app/enum_1"));
    t.end();
});

tap.test("it should leave empty var statements", (t) => {
    t.ok(test("app/helper_1"));
    t.end();
});

tap.test("it should leave empty var statements", (t) => {
    t.ok(test("app/helper_2"));
    t.end();
});

tap.test("it should work for named dependencies", (t) => {
    t.ok(test("app/helper_3"));
    t.end();
});

tap.test("it should leave empty var statements", (t) => {
    t.ok(test("app/model_1"));
    t.end();
});

tap.test("it should handle returns of objects", (t) => {
    t.ok(test("app/model_2"));
    t.end();
});

tap.test("it should convert views correctly", (t) => {
    t.ok(test("app/view_1"));
    t.end();
});

tap.test("it should convert modules with functions after the return correctly", (t) => {
    t.ok(test("app/view_2"));
    t.end();
});

tap.test("it should convert modules with constructors assigned to variables correctly", (t) => {
    t.ok(test("app/view_3"));
    t.end();
});

tap.test("it should handle a var declaration which is moved to a separate line", (t) => {
    t.ok(test("app/view_4"));
    t.end();
});

tap.test("it should drop an empty define", (t) => {
    t.ok(test("app/view_spec_1"));
    t.end();
});

tap.test("it should convert subapps correctly", (t) => {
    t.ok(test("app/subapp_1"));
    t.end();
});

tap.test("it should covert subapp specs correctly", (t) => {
    t.ok(test("app/subapp_spec_1"));
    t.end();
});

tap.test("it should convert modules with one require sugar call expression correctly", (t) => {
    t.ok(test("app/module_1"));
    t.end();
});

tap.test("it should convert modules with multiple require sugar call expressions correctly", (t) => {
    t.ok(test("app/module_2"));
    t.end();
});

tap.test("it should convert module specs correctly", (t) => {
    t.ok(test("app/module_spec_1"));
    t.end();
});

tap.test("it should convert troopjs components correctly", (t) => {
    t.ok(test("web-examples/troopjs_component_1"));
    t.end();
});

tap.test("it should convert troopjs components correctly", (t) => {
    t.ok(test("web-examples/troopjs_component_2"));
    t.end();
});

tap.test("it should convert todomvc backbone requirejs example correctly", (t) => {
    t.ok(test("web-examples/todomvc_backbone_requirejs_1"));
    t.end();
});

tap.test("it should convert todomvc backbone requirejs example correctly", (t) => {
    t.ok(test("web-examples/todomvc_backbone_requirejs_2"));
    t.end();
});

tap.test("it should convert todomvc backbone requirejs example correctly", (t) => {
    t.ok(test("web-examples/todomvc_backbone_requirejs_3"));
    t.end();
});

tap.test("it should convert todomvc angular requirejs example correctly", (t) => {
    t.ok(test("web-examples/todomvc_angularjs_requirejs_1"));
    t.end();
});

tap.test("it should convert todomvc angular requirejs example correctly", (t) => {
    t.ok(test("web-examples/todomvc_angularjs_requirejs_2"));
    t.end();
});

tap.test("it should convert todomvc angular requirejs example correctly", (t) => {
    t.ok(test("web-examples/todomvc_angularjs_requirejs_3"));
    t.end();
});

tap.test("it should convert todomvc knockout requirejs example correctly", (t) => {
    t.ok(test("web-examples/todomvc_knockout_requirejs_1"));
    t.end();
});

tap.test("it should convert todomvc lavaca requirejs example correctly", (t) => {
    t.ok(test("web-examples/todomvc_lavaca_requirejs_1"));
    t.end();
});

tap.test("it should convert todomvc somajs requirejs example correctly", (t) => {
    t.ok(test("web-examples/todomvc_somajs_requirejs_1"));
    t.end();
});

tap.test("it should convert todomvc somajs requirejs example correctly", (t) => {
    t.ok(test("web-examples/todomvc_somajs_requirejs_2"));
    t.end();
});