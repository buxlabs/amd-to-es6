define(["core/view", "subapps/hello/template/layout"], function (View, template) {
  "use strict";

  return View.extend({
    template: template,
    events: { "click .js-hello": "onHello" },
    onHello: function () { console.log("Hello world!" ); }
  });
});
