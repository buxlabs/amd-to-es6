# buxlabs.amd-to-es6 v0.3.1
convert amd to es6

examples:

in:

```javascript
define([
    'core/view',
    'subapp/hello/template/layout'
], function (View, template) {
    'use strict';

    return View.extend({
        template: template
    });

});
```

out:

```javascript
import View from 'core/view';
import template from 'subapp/hello/template/layout';

export default View.extend({
    template: template
});
```

in:

```javascript
define(function (require) {
    'use strict';

    var Marionette = require('marionette');

    return Marionette.Object.extend({
        initialize: function () {
            console.log('hello world');
        }
    });
});
```

out:

```javascript
import Marionette from 'marionette';

export default Marionette.Object.extend({
    initialize: function () {
        console.log('hello world');
    }
});
```
