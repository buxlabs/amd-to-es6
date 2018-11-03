import channel from "core/channel";
export default {
  fetch: function () {
    // hello world
    return channel.request("service:properties:request");
  }
};
