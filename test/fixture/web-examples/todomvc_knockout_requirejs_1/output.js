import ko from "knockout";

var Todo = function (title, completed) {
  this.title = ko.observable(title);
  this.completed = ko.observable(completed);
  this.editing = ko.observable(false);
};

export default Todo;
