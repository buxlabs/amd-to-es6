define('person', ['troopjs-core/component/base', 'jquery'], 
function personModule(Component, $) {
  return Component.extend(function personComponent(name) {
      this.name = name;
    },
    {
      "sig/start": function startSignal(time) {
        var me = this;
        return $.ajax({
          url: "give-birth",
          data: {
            name: me.name,
            birth: time
          }
        });
      }
    });
});