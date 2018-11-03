define(function (require) {
  "use strict";

  var Marionette = require("backbone.marionette");

  require("side-effect");

  return Marionette.Object.extend({

    initialize: function (options) {
      this.window.hello();
    }

  });

});
