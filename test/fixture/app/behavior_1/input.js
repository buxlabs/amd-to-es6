define([
    "core/behavior",
    "typeahead"
], function (Behavior) {
    "use strict";

    return Behavior.extend({
        ui: {
            hello: ".world"
        },
        onRender: function () {
            this.ui.hello.typeahead();
        }
    });

});
