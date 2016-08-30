# Strudel

<p align="center">
  <a href="https://www.npmjs.com/package/strudel"><img src="https://img.shields.io/npm/v/strudel.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/strudel"><img src="https://img.shields.io/npm/l/strudel.svg" alt="License"></a>
  <br>
  <a href="https://saucelabs.com/u/vuejs"><img src="https://saucelabs.com/browser-matrix/vuejs.svg" alt="Sauce Test Status"></a>
</p>

Strudel (@) is a JavaScript library for decorating HTML with functionality using ES7 decorators.

* **Decorators**: Boilerplate is reduced to minimum thanks to many useful decorators
* **Component-Based**: Strudel is component oriented so every dom element is related with ES6 class
* **Lightweight and extensible**: Mix and match with all your favourite frameworks

## Examples

Here is simplest component to get you started:

```js
@Component('.greeter')
class Greeter {
  constructor(element) {
    element.html('Hello world!');
  }
}
```
and HTML:

```html
<div class="greeter"></div>
```

This example will render "Hello world" on a page

## Build

Once you have repository cloned, building a copy of Quantum is really easy

```
npm install
npm run build
```

## Contributing

Coming soon
