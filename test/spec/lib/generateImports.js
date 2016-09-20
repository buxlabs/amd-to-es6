"use strict";

const tap = require("tap");
const escodegen = require("escodegen");
const getDependencies = require("../../../src/lib/getDependencies");
const generateImports = require("../../../src/lib/generateImports");

tap.test("it should be possible to generate one import", function (t) {

    var source = `define(["core/view"], function (View) { return View.extend({}); });`;
    var dependencies = getDependencies(source);
    var imports = generateImports(dependencies);
    var code = escodegen.generate({ type: "Program", body: imports });
    t.ok(code === "import View from 'core/view';");
    t.end();

});

tap.test("it should be possible to generate multiple imports", function (t) {

    var source = `
        define([
            "core/view",
            "subapp/home/template/layout.jst"
        ], function (View, jst) {
            "use strict";

            return View.extend({
                template: jst
            });

        });
    `;
    var dependencies = getDependencies(source);
    var imports = generateImports(dependencies);
    var code = escodegen.generate({ type: "Program", body: imports });
    t.ok(code === "import View from 'core/view';\nimport jst from 'subapp/home/template/layout.jst';");
    t.end();

});
