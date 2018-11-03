define(function (require) {
  "use strict";

  const Marionette = require("backbone.marionette"),
    text = "Hello world!";

  return Marionette.Object.extend({

    initialize: function () {
      console.log(text);
    }

  });

});
