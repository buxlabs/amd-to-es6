define([
    "core/behavior",
    "jquery.swing"
], function (Behavior) {
    "use strict";

    return Behavior.extend({
        ui: {
            hello: ".world"
        },
        onRender: function () {
            this.ui.hello.swing();
        }
    });

});
