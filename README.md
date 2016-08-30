# Strudel

Strudel is JavaScript library for enhancing html with interactions. You not always need fancy MVC framework for adding simple interactions to the page. Quantum will make that a pleasure.

* **Decorator**: Boilerplate is reduced to minimum thanks to using decorators
* **Component-Based**: Strudel is component oriented, every dom element is related with ES6 class
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
npm run build-dev
```

## Contributing

Coming soon
