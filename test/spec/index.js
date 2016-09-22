"use strict";

const tap = require("tap");
const fs = require("fs");
const path = require("path");
const converter = require("../../index");

// TODO replace with custom assert
function compare (result, output) {
    return result.replace(/\s+/g, "") === output.replace(/\s+/g, "");
}

tap.test("the converter should be available", function (t) {
    t.assert(typeof converter === "function");
    t.end();
});

tap.test("it should convert define correctly using amd-to-es6", function (t) {
    const file1 = path.join(__dirname, "../fixture/define-empty-array/input.js");
    const file2 = path.join(__dirname, "../fixture/define-empty-array/output.js");
    const input = fs.readFileSync(file1, "utf8");
    const output = fs.readFileSync(file2, "utf8");
    const result = converter(input, { parser: "amd-to-es6", beautify: true });
    t.assert(compare(result, output));
    t.end();
});

tap.test("it should convert define correctly using the built in parser", function (t) {
    const file1 = path.join(__dirname, "../fixture/define-empty-array/input.js");
    const file2 = path.join(__dirname, "../fixture/define-empty-array/output.js");
    const input = fs.readFileSync(file1, "utf8");
    const output = fs.readFileSync(file2, "utf8");
    const result = converter(input, { beautify: true });
    t.assert(compare(result, output));
    t.end();
});

tap.test("it should convert define with callback only correctly using the built in parser", function (t) {
    const file1 = path.join(__dirname, "../fixture/define-callback-only/input.js");
    const file2 = path.join(__dirname, "../fixture/define-callback-only/output.js");
    const input = fs.readFileSync(file1, "utf8");
    const output = fs.readFileSync(file2, "utf8");
    const result = converter(input, { beautify: true });
    t.assert(compare(result, output));
    t.end();
});

tap.test("it should convert views correctly", function (t) {
    const file1 = path.join(__dirname, "../fixture/app/view_1/input.js");
    const file2 = path.join(__dirname, "../fixture/app/view_1/output.js");
    const input = fs.readFileSync(file1, "utf8");
    const output = fs.readFileSync(file2, "utf8");
    const result = converter(input, { parser: "amd-to-es6", beautify: true });
    t.assert(compare(result, output));
    t.end();
});

tap.test("it should convert controllers correctly", function (t) {
    const file1 = path.join(__dirname, "../fixture/app/controller_1/input.js");
    const file2 = path.join(__dirname, "../fixture/app/controller_1/output.js");
    const input = fs.readFileSync(file1, "utf8");
    const output = fs.readFileSync(file2, "utf8");
    const result = converter(input, { beautify: true });
    t.assert(compare(result, output));
    t.end();
});

tap.test("it should convert subapps correctly", function (t) {
    const file1 = path.join(__dirname, "../fixture/app/subapp_1/input.js");
    const file2 = path.join(__dirname, "../fixture/app/subapp_1/output.js");
    const input = fs.readFileSync(file1, "utf8");
    const output = fs.readFileSync(file2, "utf8");
    const result = converter(input, { beautify: true });
    t.assert(compare(result, output));
    t.end();
});

tap.test("it should convert modules with functions after the return correctly", function (t) {
    const file1 = path.join(__dirname, "../fixture/app/view_1/input.js");
    const file2 = path.join(__dirname, "../fixture/app/view_1/output.js");
    const input = fs.readFileSync(file1, "utf8");
    const output = fs.readFileSync(file2, "utf8");
    const result = converter(input, { beautify: true });
    t.assert(compare(result, output));
    t.end();
});

tap.test("it should convert modules with require sugar correctly", function (t) {
    const file1 = path.join(__dirname, "../fixture/app/module_1/input.js");
    const file2 = path.join(__dirname, "../fixture/app/module_1/output.js");
    const input = fs.readFileSync(file1, "utf8");
    const output = fs.readFileSync(file2, "utf8");
    const result = converter(input, { beautify: true });
    t.assert(compare(result, output));
    t.end();
});