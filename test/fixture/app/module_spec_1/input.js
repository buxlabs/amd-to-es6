define([
    "module/hello/hello.module"
], function (HelloModule) {
    "use strict";

    var module;

    describe("HelloModule", function () {

        beforeEach(function () {
            module = new HelloModule();
        });

        afterEach(function () {
            module.destroy();
        });

        it("should be defined", function () {
            expect(module).toBeDefined();
        });

    });
});
