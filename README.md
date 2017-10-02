<p align="center"><img width="100px" src="http://strudeljs.org/images/strudel-twoline.svg"></p>
<br>
<p align="center">
<a href="https://circleci.com/gh/strudeljs/strudel/tree/dev"><img src="https://circleci.com/gh/strudeljs/strudel.svg?style=shield&circle-token=:circle-token" alt="Build Status"></a>
<a href="https://codecov.io/gh/strudeljs/strudel"><img src="https://codecov.io/gh/strudeljs/strudel/branch/master/graph/badge.svg" alt="Codecov" /></a>
<a href="https://www.npmjs.com/package/strudel"><img src="https://img.shields.io/npm/v/strudel.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/strudel"><img src="https://img.shields.io/npm/l/strudel.svg" alt="License"></a>
<a href="https://gitter.im/strudel-js"><img src="https://img.shields.io/gitter/room/nwjs/nw.js.svg" alt="Gitter"></a>
</p>

Strudel.js (`@`) is a lightweight ECMAScript 2015 component framework that main features are:

* **Decorators**: Boilerplate reduced to minimum
* **Component-Based**: Modularise and easily extend your DOM functionality
* **Small footprint**: No dependencies, ~3kb gzipped

## Browser Support

Strudel.js supports all the browsers that are ES5 and DOM4 compliant (IE10 and below not supported).

<p align="center">
<a href="https://saucelabs.com/beta/builds/1a3443d3a9484a33a80695fd8b1e8015"><img src="https://saucelabs.com/browser-matrix/hayalet.svg" alt="Browser Matrix"></a>
</p>

## Quickstart

Here is simplest component to get you started:

```js
@Component('.greeter')
class Greeter {
  init() {
    this.$element.html('Hello world!');
  }
}
```

It's recommended to start a project using dedicated [CLI](https://github.com/strudeljs/strudel-cli)

## Documentation

To check more examples and docs visit [strudeljs.org](http://strudeljs.org).

## Contributing

Please make sure to read the [Contributing Guide](https://github.com/strudeljs/strudel/blob/master/CONTRIBUTING.md) before making a pull request.

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present, Mateusz Łuczak
