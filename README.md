# AMD to ES converter

![npm](https://img.shields.io/npm/v/@buxlabs/amd-to-es6.svg) [![Codeship](https://img.shields.io/codeship/f6299130-6721-0134-f3f9-02d00f1d3243/master.svg)](https://app.codeship.com/projects/176125)

> AMD (Asynchronous Module Definition) to ES (EcmaScript) Module converter

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Examples](#examples)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)

## Background

AMD was very popular and used in many big applications worldwide. ES Module standard was created much later and with the rise of various bundlers and transpilers it became possible to write modern code with more concise syntax. This tool was created to fill the migration gap, as other tools were not handling some of the edge cases. It should handle most of existing code out of the box.

This tool exposes both a cli and a programmatic interface.

## Install

`npm install -g @buxlabs/amd-to-es6`

## Usage

### cli

Convert a single file with:

`amdtoes6 app.js > app-es6.js`

Convert multiple files in given dir with:

`amdtoes6 --src=src --dest=build`

Convert multiple files in given dir recursively with:

`amdtoes6 --src=src --dest=build --glob=**/*.js`

Convert multiple files and replace them with:

`amdtoes6 --src=src --replace`

### Options
```sh

  Usage: amdtoes6 [options]

  Options:

    -s, --src <dirname>     Directory of the source files
    -d, --dest <dirname>    Directory of the destination files
    -g, --glob [glob]       Glob pattern for the src to match for input files
    -r, --recursive         Set glob pattern to **/*.js with no hassle
    -b, --beautify          Beautify the output
    --replace           Replace the input files with results
    --suffix <string>   Replace suffix of the files
    --quotes            Single, double or auto quotes in the output

```

### node

Convert a single file with:

```javascript
const amdtoes6 = require('@buxlabs/amd-to-es6');
const source = 'define({ hello: 'world' });';
const result = amdtoes6(source); // export default { hello: 'world' };
```

## Examples

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

**ES**

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

**ES**

```javascript
import Marionette from 'marionette';

export default Marionette.Object.extend({
    initialize: function () {
        console.log('hello world');
    }
});
```

There are more examples in the test/fixture directory

## Maintainers

[@emilos](https://github.com/emilos).

## Contributing

All contributions are highly appreciated! Open an issue or a submit PR.

The lib follows the tdd approach and is expected to have a high code coverage.

## Credits

https://github.com/jonbretman/amd-to-as6

## License

MIT © buxlabs
