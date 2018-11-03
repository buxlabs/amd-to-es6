import Marionette from "backbone.marionette";
const text = "Hello world!";

export default Marionette.Object.extend({
  initialize: function () {
    console.log(text);
  }
});
