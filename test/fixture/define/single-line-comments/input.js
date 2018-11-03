define(["core/channel"], function (channel) {
  "use strict";

  return {
    fetch: function () {
      // hello world
      return channel.request("service:properties:request");
    }
  };

});
