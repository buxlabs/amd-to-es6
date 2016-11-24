define(function (require) {
    "use strict";

    var codesEnum = require("enum/codes.enum"),
        models = {};

    models[codesEnum.FIRST] = require("model/first.model");
    models[codesEnum.SECOND] = require("model/second.model");

    return {
        getClass: function (type) {
            return models[type];
        }
    };
});