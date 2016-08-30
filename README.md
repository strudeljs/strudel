<img width="200px" src="https://dl.dropboxusercontent.com/s/1rywrcxbh9p77mr/strudel.png">
<br>
<a href="https://circleci.com/gh/hayalet/strudel/tree/master"><img src="https://img.shields.io/circleci/token/2332b587f2c012314b7e865cd57730587cd75ba7/project/hayalet/strudel/master.svg" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/strudel"><img src="https://img.shields.io/npm/v/strudel.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/strudel"><img src="https://img.shields.io/npm/l/strudel.svg" alt="License"></a>

Strudel (@) is a JavaScript library for decorating web pages with functionality using ES7 decorators.

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

Once you have repository cloned, building a copy of Strudel is really easy

```
npm install
npm run build
```

## Contributing

Coming soon
