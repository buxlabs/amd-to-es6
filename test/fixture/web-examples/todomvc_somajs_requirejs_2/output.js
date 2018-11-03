var TodoModel = function () {

  var storeKey = "todos-somajs";

  return {
    get: function () {
      return JSON.parse(localStorage.getItem(storeKey) || "[]");
    },
    set: function (items) {
      localStorage.setItem(storeKey, JSON.stringify(items));
    },
    getActive: function () {
      return this.get().filter(function (item) {
        return !item.completed;
      }).length;
    }
  };
};

export default TodoModel;
