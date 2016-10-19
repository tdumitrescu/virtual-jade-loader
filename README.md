# virtual-jade-loader
[![Build Status](https://travis-ci.org/tdumitrescu/virtual-jade-loader.svg?branch=master)](https://travis-ci.org/tdumitrescu/virtual-jade-loader)

A [Webpack](https://webpack.github.io/) loader which uses
[virtual-jade](https://github.com/jonathanong/virtual-jade) in order to
translate [Jade](http://jade-lang.com/) templates into Hyperscript for
[virtual-dom](https://github.com/Matt-Esch/virtual-dom) diffing/rendering
flows.

## Installation

Add `virtual-jade-loader` to dev dependencies in `package.json`:

    npm install --save-dev virtual-jade-loader

Tell Webpack to use this loader for `.jade` files, in `webpack.config.js`:

```javascript
var webpackConfig = {
  module: {
    loaders: [
      {
        test: /\.jade$/,
        loader: 'virtual-jade',
      },
    ],
  },

  // ...

};
```

## Configuration

The recommended way to configure options for `virtual-jade` is with a top-level `virtualJadeLoader` object, e.g.:
```javascript
var webpackConfig = {
  module: {
    // ...
  },

  virtualJadeLoader: {
    runtime: 'var h = require("my-special-lib/h");',
  },

  // ...
};
```

The available options are:
- `marshalDataset`
- `pretty`
- `propsWrapper`
- `runtime`
- `vdom`

See the [virtual-jade documentation](https://github.com/tdumitrescu/virtual-jade#api) for an explanation of the options.


## Usage

With Webpack configured as above, simply import/require a Jade file to
access the compiled template function, which returns a virtual-dom `VNode`
instead of HTML:

```javascript
import template from './index.jade';
const vtree = template({foo: 'bar'});
```

## License

MIT
