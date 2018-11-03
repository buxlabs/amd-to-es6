import $ from "jquery";
import Backbone from "backbone";
import Todos from "collections/todos";
import Common from "common";

var TodoRouter = Backbone.Router.extend({
  routes: {
    "*filter": "setFilter"
  },

  setFilter: function (param) {
    Common.TodoFilter = param || "";
    Todos.trigger("filter");
  }
});

export default TodoRouter;
