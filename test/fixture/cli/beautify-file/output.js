import View from "core/view";
import template from "subapps/hello/template/layout";
export default View.extend({
  template: template,
  events: {
    "click .js-hello": "onHello"
  },
  onHello: function() {
    console.log("Hello world!");
  }
});
