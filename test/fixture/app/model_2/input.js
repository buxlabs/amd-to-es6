define(["core/model"], function (Model) {
  "use strict";

  var Model1, Model2;

  Model1 = Model.extend({
    defaults: {
      status: "1"
    }
  });

  Model2 = Model.extend({
    defaults: {
      status: "2"
    }
  });

  return {
    Model1: Model1,
    Model2: Model2
  };
});
