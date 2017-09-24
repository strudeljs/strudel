<p align="center"><img width="100px" src="http://strudeljs.org/images/strudel-twoline.svg"></p>
<br>
<p align="center">
<a href="https://circleci.com/gh/strudeljs/strudel/tree/master"><img src="https://circleci.com/gh/strudeljs/strudel.svg?style=shield&circle-token=:circle-token" alt="Build Status"></a>
<a href="https://codecov.io/gh/strudeljs/strudel"><img src="https://codecov.io/gh/strudeljs/strudel/branch/master/graph/badge.svg" alt="Codecov" /></a>
<a href="https://www.npmjs.com/package/strudel"><img src="https://img.shields.io/npm/v/strudel.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/strudel"><img src="https://img.shields.io/npm/l/strudel.svg" alt="License"></a>
</p>

Strudel (@) is a JavaScript component framework using decorators.

* **Decorators**: Boilerplate reduced to minimum
* **Component-Based**: Modularise and easily extend your DOM functionality
* **Lightweight**: No dependencies, ~3kb gzipped

## Note

This library cannot be used without **Babel** and plugin enabling **Decorators** (`babel-decorators-legacy`)

## Examples

Here is simplest component (JS) to get you started:

```js
@Component('.greeter')
class Greeter {
  init() {
    this.$element.html('Hello world!');
  }
}
```
and corresponding HTML:

```html
<div class="greeter"></div>
```

This example will render "Hello world" on a page

## Build

Once you have repository cloned, building a copy of Strudel is really easy

```
npm install
npm run build
```

## Contributing

Coming soon
