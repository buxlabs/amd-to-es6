"use strict";

const tap = require("tap");
const escodegen = require("escodegen");
const getModuleCode = require("../../../src/lib/getModuleCode");
const generateCode = require("../../../src/lib/generateCode");

tap.test("it should be available", function (t) {
    t.assert(typeof generateCode === "function");
    t.end();
});

tap.test("generateCode should work when returning a Literal", function (t) {

    var source = `
        define([], function () {
            return 1;
        });
    `;
    var code = getModuleCode(source);
    var output = generateCode(source, code);
    var actual = escodegen.generate({ type: 'Program', body: output });
    var expected = `export default 1;`
    t.ok(actual === expected);
    t.end();

});

tap.test("generateCode should strip use strict statement", function (t) {

    var source = `
        define([], function () {
            "use strict";

            return 1;
        });
    `;
    var code = getModuleCode(source);
    var output = generateCode(source, code);
    var actual = escodegen.generate({ type: 'Program', body: output });
    var expected = `export default 1;`
    t.ok(actual === expected);
    t.end();

});
