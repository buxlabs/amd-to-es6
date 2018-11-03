define([], function () {
  "use strict";

  describe("subapp/hello/view/layout.view", function () {

    var LayoutView, view;

    beforeAll(function (done) {
      require(["subapp/hello/view/layout.view"], function (View) {
        LayoutView = View;
        done();
      });
    });

    beforeEach(function () {
      view = new LayoutView();
    });

    afterEach(function () {
      view.destroy();
    });

    it("should be defined", function () {
      expect(view).toBeDefined();
    });
  });
});
