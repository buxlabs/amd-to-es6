define(function () {
    "use strict";

    var SOME_CONST = "MY_MAGIC_STRING",
        helper;

    helper = {
        hello: function () {
            console.log(SOME_CONST);
        }
    };

    return helper;
});
