import Marionette from "marionette";
import Radio from "backbone.radio";

export default Marionette.Object.extend({
  initialize: function () {
    var channel = Radio.channel("global");
    channel.trigger("hello:world");
  }
});
