define([
    'core/controller/authorization.controller'
], function (AuthorizationController) {
    'use strict';

    return AuthorizationController.extend({
        show: function () {
            require([
                'subapp/logs/show/controller/show.controller'
            ], function (Controller) {
                new Controller();
            });
        }
    });

});
