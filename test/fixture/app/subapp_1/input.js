define([
  "core/subapp",
  "subapps/hello/controller"
], function (
  Subapp,
  Controller
) {
  "use strict";

  var actions = ["hello", "world"];

  return Subapp.extend({

    Controller: Controller,
    ControllerOptions: {
      actions: {
        show: actions
      }
    },

    routes: {
      "hello": "show"
    },

    initialize: function () {
      this.listenTo(channel, "hello:show", this.onHelloShow);
    },

    onHelloShow: function (options) {
      channel.trigger("navigate", "hello");
      this.controller.show(options);
    }

  });

});
