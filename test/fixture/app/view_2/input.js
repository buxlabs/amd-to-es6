define(["common/core/view"], function (View) {
  "use strict";

  return View.extend({
    method1: method,
    method2: method
  });

  function method () {
    console.log("hello world");
  }

});
