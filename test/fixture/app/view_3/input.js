define(function (require) {
  "use strict";

  var View = require("core/view"),
    template = require("subapps/hello/template/layout"),
    MyView = View.extend({
      template: template
    });

  MyView.ENUM = {
    SEND: "send",
    CANCEL: "cancel"
  };

  return MyView;
});
