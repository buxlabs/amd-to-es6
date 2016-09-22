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

tap.test("the converter should be available", function (t) {
    t.assert(typeof converter === "function");
    t.end();
});

tap.test("it should convert empty define correctly", function (t) {
    t.assert(test("define-empty-array"));
    t.end();
});

tap.test("it should convert define with callback only correctly using the built in parser", function (t) {
    t.assert(test("define-callback-only"));
    t.end();
});

tap.test("it should convert controllers correctly", function (t) {
    t.assert(test("app/controller_1"));
    t.end();
});

tap.test("it should leave empty var statements", { todo: true }, function (t) {
    t.assert(test("app/helper_1"));
    t.end();
});

tap.test("it should convert views correctly", function (t) {
    t.assert(test("app/view_1"));
    t.end();
});

tap.test("it should convert modules with functions after the return correctly", function (t) {
    t.assert(test("app/view_2"));
    t.end();
});

tap.test("it should convert modules with constructors assigned to variables correctly", { todo: true }, function (t) {
    t.assert(test("app/view_3"));
    t.end();
});

tap.test("it should convert subapps correctly", function (t) {
    t.assert(test("app/subapp_1"));
    t.end();
});

tap.test("it should convert modules with one require sugar call expression correctly", function (t) {
    t.assert(test("app/module_1"));
    t.end();
});

tap.test("it should convert modules with multiple require sugar call expressions correctly", function (t) {
    t.assert(test("app/module_2"));
    t.end();
});
