# AMD to ES6 converter, v0.5.2

[ ![Codeship Status for buxlabs/buxlabs.amd-to-es6](https://app.codeship.com/projects/f6299130-6721-0134-f3f9-02d00f1d3243/status?branch=master)](https://app.codeship.com/projects/176125)

## Installation

`npm install -g buxlabs.amd-to-es6`

## Usage

Convert a single file with:

`amdtoes6 app.js > app-es6.js`

Convert multiple files in given dir with:

`amdtoes6 --src=src --dest=build`

Convert multiple files in given dir recursively with:

`amdtoes6 --src=src --dest=build --glob=**/*.js`

Convert multiple files and replace them with:

`amdtoes6 --src=src --replace`

## Examples:

**AMD**

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

**ES6**

```javascript
import View from 'core/view';
import template from 'subapp/hello/template/layout';

export default View.extend({
    template: template
});
```

**AMD**

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

**ES6**

```javascript
import Marionette from 'marionette';

export default Marionette.Object.extend({
    initialize: function () {
        console.log('hello world');
    }
});
```

There are more examples in the test/fixture directory

### Options
```sh

  Usage: amdtoes6 [options]

  Options:

    --src <dirname>     Directory of the source files
    --dest <dirname>    Directory of the destination files
    --glob [glob]       Glob pattern for the src to match for input files
    --replace           Replace the input files with results
    --suffix <string>   Replace suffix of the files
    --beautify          Beautify the output

```

## Inspired by:

https://github.com/jonbretman/amd-to-as6
