import a from 'beta';

var b = function () {
    var hello = function () {
        return {
            world: function () {}
        };
    };
    hello().world();
    return a.verb();
};
export { b as verb };
