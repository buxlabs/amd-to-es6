import AuthorizationController from "core/controller/authorization.controller";

export default AuthorizationController.extend({
  show: function() {
    require(["subapp/logs/show/controller/show.controller"], function(Controller) {
      new Controller();
    });
  }
});
