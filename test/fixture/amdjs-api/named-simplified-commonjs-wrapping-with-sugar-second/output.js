import beta from 'beta';

export function verb () {
    var hello = function () {
        return {
            world: function () {}
        };
    };
    hello().world();
    return beta.verb();
}
