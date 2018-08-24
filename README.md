<p align="center"><img width="100px" src="http://strudeljs.org/images/strudel-twoline.svg"></p>
<br>
<p align="center">
<a href="https://nodejs.org/api/documentation.html#documentation_stability_index"><img src="https://img.shields.io/badge/stability-experimental-orange.svg" alt="Stability"></a>
<a href="https://circleci.com/gh/strudeljs/strudel/tree/dev"><img src="https://circleci.com/gh/strudeljs/strudel.svg?style=shield&circle-token=:circle-token" alt="Build Status"></a>
<a href="https://codecov.io/gh/strudeljs/strudel"><img src="https://codecov.io/gh/strudeljs/strudel/branch/master/graph/badge.svg" alt="Codecov" /></a>
<a href="https://npmcharts.com/compare/strudel?minimal=true"><img src="https://img.shields.io/npm/dm/strudel.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/strudel"><img src="https://img.shields.io/npm/v/strudel.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/strudel"><img src="https://img.shields.io/npm/l/strudel.svg" alt="License"></a>
<a href="https://gitter.im/strudel-js"><img src="https://img.shields.io/gitter/room/nwjs/nw.js.svg" alt="Gitter"></a> 
</p>

## Introduction

Strudel.js is a lightweight framework that helps providing interactivity to back-end rendered pages through modern toolstack and usage of latest standards. It is designed to support writing code in elegant, DRY way in projects where you have little or no control over the HTML markup (i.e. projects based on back-end frameworks, component libraries or Content Management Systems). The main features are:

* **Declarative API**: Boilerplate reduced to minimum with handy decorators
* **Component architecture**: Modularised and encapsulated way of writing code
* **Small footprint**: Zero dependencies, concise API, ~4kb gzipped 
* **Ecosystem**: Bunch of tools for better day-to-day developer life

## Browser Support

Strudel.js supports all the browsers that are ES5 (transpiled) and DOM4 compliant (IE10 and below not supported).

<p align="center">
<a href="https://saucelabs.com/beta/builds/1a3443d3a9484a33a80695fd8b1e8015"><img src="https://saucelabs.com/browser-matrix/hayalet.svg" alt="Browser Matrix"></a>
</p>

## Documentation

To check examples and docs visit [strudeljs.org](https://strudeljs.org).

## Ecosystem

| Project | Status | Description |
|---------|--------|-------------|
| [strudel-cli]             | [![strudel-cli-status]][strudel-cli-package] | Project scaffolding |
| [strudel-redux]           | [![strudel-redux-status]][strudel-redux-package] | State management |
| [eslint-plugin-strudel]   | [![eslint-plugin-strudel-status]][eslint-plugin-strudel-package] | Official ESLint plugin |
| [strudel-devtools]        | [![strudel-devtools-status]][strudel-devtools-package] | Browser DevTools extension |

[strudel-cli]: https://github.com/strudeljs/strudel-cli
[strudel-devtools]:  https://github.com/strudeljs/strudel-devtools
[strudel-redux]: https://github.com/strudeljs/strudel-redux
[eslint-plugin-strudel]: https://github.com/strudeljs/eslint-plugin-strudel

[strudel-cli-status]: https://img.shields.io/npm/v/strudel-cli.svg
[strudel-devtools-status]: https://img.shields.io/chrome-web-store/v/akafkoceecgepokmamadojdimijcpnkl.svg
[strudel-redux-status]: https://img.shields.io/npm/v/strudel-redux.svg
[eslint-plugin-strudel-status]: https://img.shields.io/npm/v/eslint-plugin-strudel.svg

[strudel-cli-package]: https://npmjs.com/package/strudel-cli
[strudel-devtools-package]: https://chrome.google.com/webstore/detail/strudel-devtools/akafkoceecgepokmamadojdimijcpnkl
[strudel-redux-package]: https://npmjs.com/package/strudel-cli
[eslint-plugin-strudel-package]: https://npmjs.com/package/eslint-plugin-strudel

## Contribution

Please make sure to read the [Contributing Guide](https://github.com/strudeljs/strudel/blob/dev/.github/CONTRIBUTING.md) before making a pull request.

## Stay in touch
* [Twitter](https://twitter.com/strudeljs)
* [Blog](https://medium.com/strudel-js)

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present, Mateusz Łuczak
