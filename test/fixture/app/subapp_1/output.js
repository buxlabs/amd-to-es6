import Subapp from "core/subapp";
import Controller from "subapps/hello/controller";

var actions = [
  "hello", "world"
];

export default Subapp.extend({

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
