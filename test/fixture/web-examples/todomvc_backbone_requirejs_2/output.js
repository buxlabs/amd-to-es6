import _ from "underscore";
import Backbone from "backbone";
import Store from "backboneLocalstorage";
import Todo from "models/todo";

var TodosCollection = Backbone.Collection.extend({
  model: Todo,

  localStorage: new Store("todos-backbone"),

  completed: function () {
    return this.where({completed: true});
  },

  remaining: function () {
    return this.where({completed: false});
  },

  nextOrder: function () {
    return this.length ? this.last().get("order") + 1 : 1;
  },

  comparator: "order"
});

export default new TodosCollection();
