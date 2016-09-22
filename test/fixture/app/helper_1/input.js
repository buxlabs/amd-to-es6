define(function (require) {
    "use strict";

    var moment = require("moment"),
        helper;

    helper = {
        hello: function () {
            console.log(moment());
        }
    };

    return helper;
});
