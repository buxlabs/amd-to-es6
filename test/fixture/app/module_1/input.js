define(function (require) {
  "use strict";

  var Marionette = require("marionette");

  return Marionette.Object.extend({
    initialize: function () {
      console.log("hello world");
    }
  });
});
