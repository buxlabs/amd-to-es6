"use strict";

const tap = require("tap");
const getDependencies = require("../../../src/lib/getDependencies");

tap.test("getDependencies should work for one dependency", function (t) {

    var source = `define(["core/view"], function (View) { return View.extend({}); });`;
    var dependencies = getDependencies(source);
    t.ok(dependencies.length === 1);
    t.ok(dependencies[0].element === "core/view");
    t.ok(dependencies[0].param === "View");
    t.end();

});

tap.test("getDependencies should work for many dependencies", function (t) {

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
    t.ok(dependencies.length === 2);
    t.ok(dependencies[0].element === "core/view");
    t.ok(dependencies[0].param === "View");
    t.ok(dependencies[1].element === "subapp/home/template/layout.jst");
    t.ok(dependencies[1].param === "jst");
    t.end();

});
