# buxlabs.amd-to-es6 v0.4.0
convert amd to es6

[ ![Codeship Status for buxlabs/buxlabs.amd-to-es6](https://app.codeship.com/projects/f6299130-6721-0134-f3f9-02d00f1d3243/status?branch=master)](https://app.codeship.com/projects/176125)

## Examples:

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

## Inspired by:

https://github.com/jonbretman/amd-to-as6
