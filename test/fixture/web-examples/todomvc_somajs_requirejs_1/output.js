import Router from "director";
var RouterModel = function (dispatcher) {

  var router = new Router().init().configure({
    notfound: render
  });

  router.on(/.*/, render);

  function render() {
    dispatcher.dispatch("render");
  }

  return {
    getRoute: function () {
      return router.getRoute()[0];
    }
  };
};

export default RouterModel;
