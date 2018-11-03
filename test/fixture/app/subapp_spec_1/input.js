describe("HelloSubapp", function () {
  "use strict";

  var HelloSubapp, subapp;

  beforeAll(function (done) {
    require([
      "subapp/hello/hello.subapp"
    ], function (Subapp) {
      HelloSubapp = Subapp;
      done();
    });
  });

  beforeEach(function () {
    subapp = new HelloSubapp();
  });

  afterEach(function () {
    subapp.destroy();
  });

  it("should be defined", function () {
    expect(subapp).toBeDefined();
  });

});
