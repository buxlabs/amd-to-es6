define([
    "core/view",
    "subapp/logs/show/template/layout.jst"
], function (View, jst) {
    "use strict";

    return View.extend({
        template: jst,
        className: "logs-layout-view",
        triggers: {
            "click .js-exceptions": "exceptions:clicked"
        }
    });

});
