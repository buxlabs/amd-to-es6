// hello world
define(["core/channel"], function (channel) {
    "use strict";

    return {
        fetch: function () {
            return channel.request("service:properties:request");
        }
    };

});
