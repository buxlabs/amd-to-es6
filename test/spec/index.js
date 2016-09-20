"use strict";

const tap = require("tap");
const fs = require("fs");
const path = require("path");
const converter = require("../../index");

tap.test("the converter should be available", function (t) {
    t.assert(typeof converter === "function");
    t.end();
});

tap.test("it should convert simple define correctly", function (t) {
    const file1 = path.join(__dirname, "../fixture/define/input.js");
    const file2 = path.join(__dirname, "../fixture/define/output.js");
    const input = fs.readFileSync(file1, "utf8");
    const output = fs.readFileSync(file2, "utf8");
    const result = converter(input, { beautify: true });
    t.assert(result === output);
    t.end();
});

tap.test("it should convert views correctly", function (t) {
    const file1 = path.join(__dirname, "../fixture/views/input.js");
    const file2 = path.join(__dirname, "../fixture/views/output.js");
    const input = fs.readFileSync(file1, "utf8");
    const output = fs.readFileSync(file2, "utf8");
    const result = converter(input, { beautify: true });
    t.assert(result === output);
    t.end();
});

tap.test("it should convert controllers correctly", { todo: true }, function (t) {
    const file1 = path.join(__dirname, "../fixture/controllers/input.js");
    const file2 = path.join(__dirname, "../fixture/controllers/output.js");
    const input = fs.readFileSync(file1, "utf8");
    const output = fs.readFileSync(file2, "utf8");
    const result = converter(input, { beautify: true });
    t.assert(result === output);
    t.end();
});
