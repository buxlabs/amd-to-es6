import Marionette from "marionette";

export default () => {
  return new Marionette.View({
    template: function () {
      return "hello world";
    }
  });
};
