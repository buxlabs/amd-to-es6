define(["marionette"], (Marionette) =>
  () => {
    return new Marionette.View({
      template: function () {
        return "hello world";
      }
    });
  }
);
