import $ from "jquery";
import Marionette from "backbone.marionette";

export default Marionette.View.extend({
  events: {
    "click button": "onButtonClick"
  },
  onButtonClick: function (e) {
    var $node = $(e.currentTarget);
    console.log($node.attr("data-event"));
  }
});
