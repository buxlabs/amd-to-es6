define(function (require) {
    var { foo } = require('bar'),
      baz = require('baz');
    return foo(baz);
});
