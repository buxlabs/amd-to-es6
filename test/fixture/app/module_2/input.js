define(function (require) {
    'use strict';

    var Marionette = require('marionette'),
        Radio = require("backbone.radio");

    return Marionette.Object.extend({
        initialize: function () {
            var channel = Radio.channel("global");
            channel.trigger("hello:world");
        }
    });
});
