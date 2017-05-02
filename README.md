# Reshape Eval Code

[![npm](https://img.shields.io/npm/v/reshape-eval-code.svg?style=flat-square)](https://npmjs.com/package/reshape-eval-code)
[![tests](https://img.shields.io/travis/reshape/eval-code.svg?style=flat-square)](https://travis-ci.org/reshape/eval-code?branch=master)
[![dependencies](https://img.shields.io/david/reshape/eval-code.svg?style=flat-square)](https://david-dm.org/reshape/eval-code)
[![coverage](https://img.shields.io/codecov/c/github/reshape/eval-code.svg?style=flat-square)](https://codecov.io/gh/reshape/eval-code)

Evaluate all code nodes and transform to text nodes

> **Note:** This project is in early development, and versioning is a little different. [Read this](http://markup.im/#q4_cRZ1Q) for more details.

### Installation

`npm install reshape-eval-code -S`

### Usage

If you have your locals and want to resolve them early so that subsequent plugins can use them directly instead of running into `code` nodes, reshape eval code is your friend. It's a very simple plugin, you just feed it your locals and it will go through all code nodes and resolve them, then run whatever they produce through a parse so that even if you produce html with your code nodes it will still come out as a full reshape AST.

```js
const reshape = require('reshape')
const expressions = require('reshape-expressions')
const evalCode = require('reshape-eval-code')

reshape({ plugins: [expressions(), evalCode({ foo: 'bar' })] })
  .process('<p>{{ foo }}</p>')
  .then((res) => {
    console.log(res.output()) // no locals required here! nice!
  })
```

### License & Contributing

- Details on the license [can be found here](LICENSE.md)
- Details on running tests and contributing [can be found here](contributing.md)
