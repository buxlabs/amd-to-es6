import angular from "angular";

var moduleName = "TodoStorageModule";
angular
  .module(moduleName, [])
  .factory("todoStorage", function () {
    var STORAGE_ID = "todos-angularjs-requirejs";

    return {
      get: function () {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || "[]");
      },

      put: function (todos) {
        localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
      }
    };
  });
export default moduleName;
