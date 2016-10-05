define('person', ['troopjs-core/component/base'], function ChildModule(Component) {
  return Component.extend(function ChildComponent(name) {
      this.name = name;
    },
    {
      "walk": function () {
        // make him walk.
      }
    });
});
