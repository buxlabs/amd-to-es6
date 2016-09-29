define(
    //The name of this module
    "types/Manager",

    //The array of dependencies
    ["types/Employee"],

    //The function to execute when all dependencies have loaded. The
    //arguments to this function are the array of dependencies mentioned
    //above.
    function (Employee) {
        function Manager () {
            this.reports = [];
        }

        //This will now work
        Manager.prototype = new Employee();

        //return the Manager constructor function so it can be used by
        //other modules.
        return Manager;
    }
);