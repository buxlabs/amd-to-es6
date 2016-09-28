define(function (require) {
    "use strict";

    var
        $ = require("jquery"),
        Marionette = require("backbone.marionette");

    return Marionette.View.extend({
        events: {
            "click button": "onButtonClick"
        },
        onButtonClick: function (e) {
            var $node = $(e.currentTarget);
            console.log($node.attr("data-event"));
        }
    });

});
